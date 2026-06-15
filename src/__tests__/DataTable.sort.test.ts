import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DataTable from '../DataTable.vue';

const headers = [
    { text: 'Name', value: 'name', sortable: true },
    { text: 'Age', value: 'age', sortable: true },
];
const items = [
    { name: 'Carol', age: 30 },
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
];

const names = (w: ReturnType<typeof mount>) =>
    w.findAll('.vdt-tbody-tr').map((r) => r.findAll('.vdt-tbody-td')[0].text());

describe('DataTable sorting', () => {
    it('single-column sort by name ascending', async () => {
        const w = mount(DataTable, { props: { headers, items } });
        await w.findAll('.vdt-thead-th')[0].trigger('click');
        expect(names(w)).toEqual(['Alice', 'Bob', 'Carol']);
    });

    it('multi-column sort: age then name', async () => {
        const w = mount(DataTable, {
            props: { headers, items, multiSort: true, sortBy: [], sortType: [] },
        });
        const ths = w.findAll('.vdt-thead-th');
        await ths[1].trigger('click'); // age asc (primary)
        await ths[0].trigger('click'); // name asc (secondary)
        // 20 之後，30 的兩筆依名字升冪：Bob, Alice, Carol
        expect(names(w)).toEqual(['Bob', 'Alice', 'Carol']);
    });
});
