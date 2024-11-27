import {
    type Ref, computed, type ComputedRef, type WritableComputedRef
} from 'vue';
import type { Item } from '../types/main';
import type { MultipleSelectStatus } from '../types/internal';

// 緩存管理器
class PageCacheManager {
    private itemKeyCache = new WeakMap<Item, string>();
    private pageCache = new Map<string, Item[]>();

    getItemKey(item: Item): string {
        let key = this.itemKeyCache.get(item);
        if (!key) {
            const { checkbox, index, ...rest } = item;
            key = Object.entries(rest)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([k, v]) => `${k}:${v}`)
                .join('|');
            this.itemKeyCache.set(item, key);
        }
        return key;
    }

    clearPageCache(): void {
        this.pageCache.clear();
    }
}

export default function usePageItems(
    currentPaginationNumber: Ref<number>,
    isMultipleSelectable: ComputedRef<boolean>,
    isServerSideMode: ComputedRef<boolean>,
    items: Ref<Item[]>,
    rowsPerPageRef: Ref<number>,
    selectItemsComputed: WritableComputedRef<Item[]>,
    showIndex: Ref<boolean>,
    totalItems: ComputedRef<Item[]>,
    totalItemsLength: ComputedRef<number>,
) {
    const cacheManager = new PageCacheManager();

    // 計算當前頁的第一個索引
    const currentPageFirstIndex = computed((): number =>
        (currentPaginationNumber.value - 1) * rowsPerPageRef.value + 1
    );

    // 計算當前頁的最後一個索引
    const currentPageLastIndex = computed((): number => {
        if (isServerSideMode.value) {
            return Math.min(
                totalItemsLength.value,
                currentPaginationNumber.value * rowsPerPageRef.value
            );
        }
        return Math.min(
            totalItems.value.length,
            currentPaginationNumber.value * rowsPerPageRef.value
        );
    });

    // 獲取當前頁的數據
    const itemsInPage = computed((): Item[] => {
        if (isServerSideMode.value) {
            return items.value;
        }
        return totalItems.value.slice(
            currentPageFirstIndex.value - 1,
            currentPageLastIndex.value
        );
    });

    // 添加索引
    const itemsWithIndex = computed((): Item[] => {
        if (!showIndex.value) {
            return itemsInPage.value;
        }
        return itemsInPage.value.map((item, index) => ({
            index: currentPageFirstIndex.value + index,
            ...item
        }));
    });

    // 計算多選狀態
    const multipleSelectStatus = computed((): MultipleSelectStatus => {
        if (selectItemsComputed.value.length === 0) {
            return 'noneSelected';
        }

        // 檢查是否存在選中項
        const hasSelectedItems = selectItemsComputed.value.some(selected =>
            totalItems.value.some(item =>
                cacheManager.getItemKey(selected) === cacheManager.getItemKey(item)
            )
        );

        if (!hasSelectedItems) {
            return 'noneSelected';
        }

        // 檢查是否全部選中
        if (selectItemsComputed.value.length === totalItems.value.length) {
            const allSelected = selectItemsComputed.value.every(selected =>
                totalItems.value.some(item =>
                    cacheManager.getItemKey(selected) === cacheManager.getItemKey(item)
                )
            );
            return allSelected ? 'allSelected' : 'partSelected';
        }

        return 'partSelected';
    });

    // 生成最終頁面數據
    const pageItems = computed((): Item[] => {
        if (!isMultipleSelectable.value) {
            return itemsWithIndex.value;
        }

        switch (multipleSelectStatus.value) {
            case 'allSelected':
                return itemsWithIndex.value.map(item => ({
                    checkbox: true,
                    ...item
                }));
            case 'noneSelected':
                return itemsWithIndex.value.map(item => ({
                    checkbox: false,
                    ...item
                }));
            default:
                return itemsWithIndex.value.map(item => {
                    const isSelected = selectItemsComputed.value.some(
                        selected => cacheManager.getItemKey(item) === cacheManager.getItemKey(selected)
                    );
                    return {
                        checkbox: isSelected,
                        ...item
                    };
                });
        }
    });

    return {
        currentPageFirstIndex,
        currentPageLastIndex,
        multipleSelectStatus,
        pageItems
    };
}
