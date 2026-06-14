import { Ref, ComputedRef, WritableComputedRef } from 'vue';
import { Item } from '../types/main';
import { MultipleSelectStatus } from '../types/internal';
export default function usePageItems(currentPaginationNumber: Ref<number>, isMultipleSelectable: ComputedRef<boolean>, isServerSideMode: ComputedRef<boolean>, items: Ref<Item[]>, rowsPerPageRef: Ref<number>, selectItemsComputed: WritableComputedRef<Item[]>, showIndex: Ref<boolean>, totalItems: ComputedRef<Item[]>, totalItemsLength: ComputedRef<number>, disabledRows: (item: Item) => boolean): {
    currentPageFirstIndex: ComputedRef<number>;
    currentPageLastIndex: ComputedRef<number>;
    multipleSelectStatus: ComputedRef<MultipleSelectStatus>;
    pageItems: ComputedRef<Item[]>;
};
//# sourceMappingURL=usePageItems.d.ts.map