import { Item } from '../../types/main';
import { DefineComponent, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
type __VLS_Props = {
    item: Item;
    index: number;
    columns: string[];
    alternating?: boolean;
    noHover?: boolean;
    borderRow?: boolean;
    borderCell?: boolean;
    bodyRowClassName?: string | ((item: Item, index: number) => string);
    isExpanded?: boolean;
    isDisabled?: boolean;
    expandColumn?: string;
    getFixedDistance?: (column: string, type: 'td' | 'th') => string | undefined;
    getFixedColumnClasses?: (column: string) => string[] | undefined;
    bodyItemClassName?: string | ((column: string, index: number) => string);
};
declare var __VLS_1: {}, __VLS_14: string, __VLS_15: any, __VLS_17: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_14>]?: (props: typeof __VLS_15) => any;
} & {
    prepend?: (props: typeof __VLS_1) => any;
} & {
    append?: (props: typeof __VLS_17) => any;
};
declare const __VLS_base: DefineComponent<__VLS_Props, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {} & {
    click: (event: MouseEvent, item: Item, index: number) => any;
    contextmenu: (event: MouseEvent, item: Item) => any;
    dblclick: (event: MouseEvent, item: Item, index: number) => any;
    "toggle-select": (item: Item) => any;
    "toggle-expand": (event: MouseEvent, index: number, item: Item) => any;
}, string, PublicProps, Readonly<__VLS_Props> & Readonly<{
    onClick?: ((event: MouseEvent, item: Item, index: number) => any) | undefined;
    onContextmenu?: ((event: MouseEvent, item: Item) => any) | undefined;
    onDblclick?: ((event: MouseEvent, item: Item, index: number) => any) | undefined;
    "onToggle-select"?: ((item: Item) => any) | undefined;
    "onToggle-expand"?: ((event: MouseEvent, index: number, item: Item) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=TableBodyRow.vue.d.ts.map