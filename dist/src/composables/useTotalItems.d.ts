import { Ref, ComputedRef, WritableComputedRef } from 'vue';
import { Item, FilterOption } from '../types/main';
import { ClientSortOptions, EmitsEventName } from '../types/internal';
export default function useTotalItems(clientSortOptions: Ref<ClientSortOptions | null>, filterOptions: Ref<FilterOption[] | null>, isServerSideMode: ComputedRef<boolean>, items: Ref<Item[]>, itemsSelected: Ref<Item[] | null>, searchField: Ref<string | string[]>, searchValue: Ref<string>, searchType: Ref<'contains' | 'regex'>, serverItemsLength: Ref<number>, multiSort: Ref<boolean>, batchSelectionThreshold: Ref<number>, disabledRows: (item: Item) => boolean, emits: (event: EmitsEventName, ...args: any[]) => void): {
    totalItems: ComputedRef<Item[]>;
    selectItemsComputed: WritableComputedRef<Item[], Item[]>;
    totalItemsLength: ComputedRef<number>;
    toggleSelectAll: (isChecked: boolean) => void;
    toggleSelectItem: (item: Item) => void;
    isProcessing: ComputedRef<boolean>;
    processProgress: ComputedRef<number>;
};
//# sourceMappingURL=useTotalItems.d.ts.map