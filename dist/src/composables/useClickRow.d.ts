import { Ref, ComputedRef } from 'vue';
import { Item } from '../types/main';
import { EmitsEventName, ClickEventType } from '../types/internal';
export default function useClickRow(clickEventType: Ref<ClickEventType>, isMultipleSelectable: ComputedRef<boolean>, showIndex: Ref<boolean>, isItemDisabled: (item: Item) => boolean, clickRowToExpand: Ref<boolean>, clickRowToSelect: Ref<boolean>, handleExpandToggle: (expandingItemIndex: number, expandingItem: Item, event: Event) => void, toggleSelectItem: (item: Item) => void, emits: (event: EmitsEventName, ...args: any[]) => void): {
    handleRowClick: (event: MouseEvent, item: Item, index: number) => void;
    handleRowDoubleClick: (event: MouseEvent, item: Item, index: number) => void;
    handleRowContextMenu: (event: MouseEvent, item: Item) => void;
};
//# sourceMappingURL=useClickRow.d.ts.map