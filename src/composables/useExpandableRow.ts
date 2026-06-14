// src/composables/useExpandableRow.ts
import { ref, type Ref, type ComputedRef } from 'vue';
import type { Item } from '../types/main';
import type { DataTableEmitFn } from '../types/internal';
import { getItemKey } from '../utils/itemKey';

export interface UseExpandableRowOptions {
    items: Ref<Item[]>;
    prevPageEndIndex: ComputedRef<number>;
    itemKey: Ref<string | undefined>;
    emits: DataTableEmitFn;
}

export default function useExpandableRow(options: UseExpandableRowOptions) {
    const { items, prevPageEndIndex, itemKey, emits } = options;
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
            // 計算在當前頁面中的索引（以 key 比對，取代 JSON.stringify）
            const expandKey = getItemKey(expandingItem, itemKey.value);
            const currentPageExpandIndex = items.value.findIndex((item) => getItemKey(item, itemKey.value) === expandKey);
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
