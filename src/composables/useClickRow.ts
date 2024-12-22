// useClickRow.ts
import { type Ref, type ComputedRef } from 'vue';
import type { Item } from '../types/main';
import type { EmitsEventName, ClickEventType } from '../types/internal';

export default function useClickRow(
    clickEventType: Ref<ClickEventType>,
    isMultipleSelectable: ComputedRef<boolean>,
    showIndex: Ref<boolean>,
    isItemDisabled: (item: Item) => boolean,
    clickRowToExpand: Ref<boolean>,
    clickRowToSelect: Ref<boolean>,
    handleExpandToggle:(expandingItemIndex: number, expandingItem: Item, event: Event) => void,
    toggleSelectItem: (item: Item) => void,
    emits: (event: EmitsEventName, ...args: any[]) => void,
) {

    const prepareRowEventData = (item: Item, index: number) => {
        const rowData = { ...item };

        if (isMultipleSelectable.value) {
            delete rowData.checkbox;
            rowData.isSelected = item.checkbox;
        }

        if (showIndex.value) {
            delete rowData.index;
            rowData.indexInCurrentPage = index + 1;
        }

        return rowData;
    };

    const handleRowClick = (event: MouseEvent, item: Item, index: number) => {
        // 如果點擊的是 checkbox 或展開按鈕，則不觸發點擊事件
        if ((event.target as HTMLElement).closest('.checkbox, .expand-button')) {
            return;
        }

        // 處理點擊展開
        if (clickRowToExpand.value) {
            handleExpandToggle( index, item,event);
        }

        // 處理點擊選擇
        if (clickRowToSelect.value && !isItemDisabled(item)) {
            toggleSelectItem(item);
        }

        // 觸發點擊事件
        if (clickEventType.value === 'single') {
            const clickRowArgument = prepareRowEventData(item, index);
            emits('clickRow', clickRowArgument, event);
        }
    };

    const handleRowDoubleClick = (event: MouseEvent, item: Item, index: number) => {
        if (clickEventType.value === 'double') {
            const clickRowArgument = prepareRowEventData(item, index);
            emits('clickRow', clickRowArgument, event);
        }
    };

    const handleRowContextMenu = (event: MouseEvent, item: Item) => {
        const clickRowArgument = prepareRowEventData(item, -1); // context menu 不需要 index
        emits('contextmenuRow', clickRowArgument, event);
    };

    return {
        handleRowClick,
        handleRowDoubleClick,
        handleRowContextMenu,
    };
}
