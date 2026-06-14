import { Ref, ComputedRef } from 'vue';
import { Item } from '../types/main';
import { EmitsEventName } from '../types/internal';
export default function useExpandableRow(items: Ref<Item[]>, prevPageEndIndex: ComputedRef<number>, emits: (event: EmitsEventName, ...args: any[]) => void): {
    expandingItemIndexList: Ref<number[], number[]>;
    updateExpandingItemIndexList: (expandingItemIndex: number, expandingItem: Item, event: Event) => void;
    clearExpandingItemIndexList: () => void;
};
//# sourceMappingURL=useExpandableRow.d.ts.map