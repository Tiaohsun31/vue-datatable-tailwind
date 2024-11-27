// src/composables/useExpandableRow.ts
import { ref, type Ref, type ComputedRef } from 'vue';
import type { Item } from '../types/main';
import type { EmitsEventName } from '../types/internal';

export default function useExpandableRow(
    items: Ref<Item[]>,
    prevPageEndIndex: ComputedRef<number>,
    emits: (event: EmitsEventName, ...args: any[]) => void,
) {
    // 存儲展開項的索引列表
    const expandingItemIndexList = ref<number[]>([]);

    // 更新展開/收起狀態
    const updateExpandingItemIndexList = (expandingItemIndex: number, expandingItem: Item, event: Event) => {
        // 阻止事件冒泡
        event.stopPropagation();
        // 檢查是否已經展開
        const index = expandingItemIndexList.value.indexOf(expandingItemIndex);
        if (index !== -1) {
            expandingItemIndexList.value.splice(index, 1);
        } else {
            // 計算在當前頁面中的索引
            const currentPageExpandIndex = items.value.findIndex((item) => JSON.stringify(item) === JSON.stringify(expandingItem));
            // 發送展開事件
            emits('expandRow', prevPageEndIndex.value + currentPageExpandIndex, expandingItem);
            // 將展開的索引加入列表
            expandingItemIndexList.value.push(prevPageEndIndex.value + currentPageExpandIndex);
        }
    };

    // 清空展開列表
    const clearExpandingItemIndexList = () => {
        expandingItemIndexList.value = [];
    };

    return {
        expandingItemIndexList,  // 展開項的索引列表
        updateExpandingItemIndexList,  // 更新展開狀態的方法
        clearExpandingItemIndexList,  // 清空展開列表的方法
    };
}
