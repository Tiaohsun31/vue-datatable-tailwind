import { type Ref, ref, computed } from 'vue';
import type { Item } from '../types/main';
import type { EmitsEventName } from '../types/internal';

interface BatchSelectionState {
    selectedItems: Set<string>;
    itemsMap: Map<string, Item>;
    selectionInProgress: boolean;
}

const itemKeysCache = new WeakMap<Item, string>();

const getItemKey = (item: Item): string => {
    let key = itemKeysCache.get(item);
    if (!key) {
        const { checkbox, index, ...data } = item;
        key = JSON.stringify(data);
        itemKeysCache.set(item, key);
    }
    return key;
};

export function useBatchSelection(
    items: Ref<Item[]>,
    emits: (event: EmitsEventName, ...args: any[]) => void,
) {
    const state = ref<BatchSelectionState>({
        selectedItems: new Set(),
        itemsMap: new Map(),
        selectionInProgress: false
    });

    // 同步版本的 toggleSelectAll
    const toggleSelectAll = (isSelected: boolean) => {
        console.time('toggleSelectAll');
        
        if (state.value.selectionInProgress) {
            console.timeEnd('toggleSelectAll');
            return;
        }

        try {
            state.value.selectionInProgress = true;

            if (!isSelected) {
                state.value.selectedItems.clear();
                return;
            }

            // 使用 WeakMap 來加速鍵的生成和查找
            const newItemsMap = new Map<string, Item>();
            const keys: string[] = [];
            
            // 批次處理以避免長時間阻塞
            const batchSize = 200;
            const totalItems = items.value;
            
            for (let i = 0; i < totalItems.length; i += batchSize) {
                const batch = totalItems.slice(i, Math.min(i + batchSize, totalItems.length));
                
                for (const item of batch) {
                    const key = getItemKey(item);
                    if (!newItemsMap.has(key)) {
                        newItemsMap.set(key, item);
                        keys.push(key);
                    }
                }
            }

            // 一次性更新狀態
            state.value.itemsMap = newItemsMap;
            state.value.selectedItems = new Set(keys);

        } finally {
            state.value.selectionInProgress = false;
            console.timeEnd('toggleSelectAll');
        }
    };

    const toggleSelectItem = (item: Item) => {
        console.time('toggleSelectItem');
        
        const key = getItemKey(item);
        const itemWithoutMeta = { ...item };
        delete itemWithoutMeta.checkbox;
        delete itemWithoutMeta.index;

        const newSelectedItems = new Set(state.value.selectedItems);
        const isCurrentlySelected = newSelectedItems.has(key);

        if (isCurrentlySelected) {
            newSelectedItems.delete(key);
            emits('deselectRow', itemWithoutMeta);
        } else {
            newSelectedItems.add(key);
            state.value.itemsMap.set(key, itemWithoutMeta);
            emits('selectRow', itemWithoutMeta);
        }

        state.value.selectedItems = newSelectedItems;
        console.timeEnd('toggleSelectItem');
    };

    // 優化計算選中項目的邏輯
    const selectedItemsList = computed(() => {
        if (state.value.selectedItems.size === 0) return [];

        // 使用更高效的陣列操作
        const result = new Array(state.value.selectedItems.size);
        let index = 0;
        
        for (const key of state.value.selectedItems) {
            const item = state.value.itemsMap.get(key);
            if (item) result[index++] = item;
        }
        
        return result.slice(0, index);
    });

    return {
        selectedItems: selectedItemsList,
        toggleSelectAll,
        toggleSelectItem,
        isProcessing: computed(() => state.value.selectionInProgress)
    };
}