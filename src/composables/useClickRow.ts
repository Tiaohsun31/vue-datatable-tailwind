// src/composables/useClickRow.ts
import { type Ref, type ComputedRef } from 'vue';
import type { Item } from '../types/main';
import type { EmitsEventName, ClickEventType } from '../types/internal';

export default function useClickRow(
    clickEventType: Ref<ClickEventType>,
    isMultipleSelectable: ComputedRef<boolean>,
    showIndex: Ref<boolean>,
    emits: (event: EmitsEventName, ...args: any[]) => void,
) {

    const clickRow = (item: Item, clickType: ClickEventType, $event: Event) => {
        if (clickEventType.value !== clickType) return;

        const clickRowArgument = { ...item };

        // 處理多選狀態
        if (isMultipleSelectable.value) {
            const { checkbox } = item;
            delete clickRowArgument.checkbox;
            clickRowArgument.isSelected = checkbox;
        }

        // 處理索引
        if (showIndex.value) {
            const { index } = item;
            delete clickRowArgument.index;
            clickRowArgument.indexInCurrentPage = index;
        }

        emits('clickRow', clickRowArgument, $event);
    };

    return {
        clickRow,
    };
}
