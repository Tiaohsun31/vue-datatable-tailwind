import { type Ref, ref, computed, watch } from 'vue';
import type { Item } from '../types/main';
import type { EmitsEventName } from '../types/internal';

interface BatchSelectionState {
    selectedItems: Set<string>;
    itemsMap: Map<string, Item>;
    selectionInProgress: boolean;
    processedCount: number;
    totalCount: number;
    visualProgress: number;
}

const BATCH_SIZE = 1000;
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
    itemsSelected: Ref<Item[] | null>,
    disabledRows: (item: Item) => boolean,
    emits: (event: EmitsEventName, ...args: any[]) => void,
) {
    const state = ref<BatchSelectionState>({
        selectedItems: new Set(),
        itemsMap: new Map(),
        selectionInProgress: false,
        processedCount: 0,
        totalCount: 0,
        visualProgress: 0
    });

    // 初始化選中狀態
    watch(itemsSelected, (newValue) => {
        if (newValue === null) {
            state.value.selectedItems.clear();
            state.value.itemsMap.clear();
            return;
        }

        const newSelectedItems = new Set<string>();
        const newItemsMap = new Map<string, Item>();

        for (const item of newValue) {
            const key = getItemKey(item);
            newSelectedItems.add(key);
            newItemsMap.set(key, item);
        }

        state.value.selectedItems = newSelectedItems;
        state.value.itemsMap = newItemsMap;
    }, { immediate: true, deep: true });

    const processBatch = async (
        batchItems: Item[],
        isSelected: boolean,
        startIndex: number
    ): Promise<void> => {
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                const newSelectedItems = new Set(state.value.selectedItems);
                const newItemsMap = new Map(state.value.itemsMap);

                for (let i = 0; i < batchItems.length; i++) {
                    const item = batchItems[i];
                    const key = getItemKey(item);

                    if (isSelected) {
                        newSelectedItems.add(key);
                        newItemsMap.set(key, item);
                    } else {
                        newSelectedItems.delete(key);
                    }

                    state.value.processedCount = startIndex + i + 1;
                    state.value.visualProgress = (state.value.processedCount / state.value.totalCount) * 100;
                }

                state.value.selectedItems = newSelectedItems;
                state.value.itemsMap = newItemsMap;
                resolve();
            });
        });
    };

    const toggleSelectAll = async (isSelected: boolean) => {
        if (state.value.selectionInProgress) return;

        try {
            state.value.selectionInProgress = true;
            state.value.processedCount = 0;
            state.value.totalCount = items.value.length;
            state.value.visualProgress = 0;

            if (!isSelected) {
                state.value.selectedItems.clear();
                state.value.itemsMap.clear();
                emits('update:itemsSelected', []);
                state.value.visualProgress = 100;
                return;
            }

            const totalItems = items.value;
            for (let i = 0; i < totalItems.length; i += BATCH_SIZE) {
                const batch = totalItems.slice(i, Math.min(i + BATCH_SIZE, totalItems.length));

                // 過濾批次中的可選項目
                const selectableBatch = batch.filter(item => !disabledRows(item));

                await processBatch(selectableBatch, isSelected, i);

                // 給 UI 線程一個更新的機會
                await new Promise(resolve => setTimeout(resolve, 0));
            }

            // 更新 itemsSelected
            emits('update:itemsSelected', selectedItemsList.value);
            if (isSelected) emits('selectAll');

        } finally {
            state.value.selectionInProgress = false;
        }
    };

    const toggleSelectItem = (item: Item) => {
        const key = getItemKey(item);
        const itemWithoutMeta = { ...item };
        delete itemWithoutMeta.checkbox;
        delete itemWithoutMeta.index;

        const newSelectedItems = new Set(state.value.selectedItems);
        const newItemsMap = new Map(state.value.itemsMap);
        const isCurrentlySelected = newSelectedItems.has(key);

        if (isCurrentlySelected) {
            newSelectedItems.delete(key);
            emits('deselectRow', itemWithoutMeta);
        } else {
            newSelectedItems.add(key);
            newItemsMap.set(key, itemWithoutMeta);
            emits('selectRow', itemWithoutMeta);
        }

        state.value.selectedItems = newSelectedItems;
        state.value.itemsMap = newItemsMap;

        // 更新 itemsSelected
        emits('update:itemsSelected', Array.from(newItemsMap.values())
            .filter(mappedItem => newSelectedItems.has(getItemKey(mappedItem))));
    };

    const selectedItemsList = computed(() => {
        if (state.value.selectedItems.size === 0) return [];

        return Array.from(state.value.itemsMap.entries())
            .filter(([key]) => state.value.selectedItems.has(key))
            .map(([, item]) => item);
    });

    const selectionProgress = computed(() => state.value.visualProgress);

    return {
        selectedItems: selectedItemsList,
        toggleSelectAll,
        toggleSelectItem,
        isProcessing: computed(() => state.value.selectionInProgress),
        selectionProgress
    };
}
