import { Ref, ComputedRef } from 'vue';
import { Item } from '../types/main';
import { EmitsEventName } from '../types/internal';
export declare function useBatchSelection(items: Ref<Item[]>, itemsSelected: Ref<Item[] | null>, disabledRows: (item: Item) => boolean, emits: (event: EmitsEventName, ...args: any[]) => void): {
    selectedItems: ComputedRef<{
        [x: string]: any;
        key?: string | number | undefined;
    }[]>;
    toggleSelectAll: (isSelected: boolean) => Promise<void>;
    toggleSelectItem: (item: Item) => void;
    isProcessing: ComputedRef<boolean>;
    selectionProgress: ComputedRef<number>;
};
//# sourceMappingURL=useBatchSelection.d.ts.map