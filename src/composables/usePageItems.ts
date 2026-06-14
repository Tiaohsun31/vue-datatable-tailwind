import {
    type Ref, computed, type ComputedRef, type WritableComputedRef
} from 'vue';
import type { Item } from '../types/main';
import type { MultipleSelectStatus } from '../types/internal';
import { getItemKey } from '../utils/itemKey';

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
    disabledRows: (item: Item) => boolean,
    itemKey: Ref<string | undefined>,
) {
    // 當前頁第一筆 / 最後一筆的索引
    const currentPageFirstIndex = computed((): number =>
        (currentPaginationNumber.value - 1) * rowsPerPageRef.value + 1
    );

    const currentPageLastIndex = computed((): number => {
        const length = isServerSideMode.value ? totalItemsLength.value : totalItems.value.length;
        return Math.min(length, currentPaginationNumber.value * rowsPerPageRef.value);
    });

    // 當前頁的資料
    const itemsInPage = computed((): Item[] => {
        if (isServerSideMode.value) return items.value;
        return totalItems.value.slice(currentPageFirstIndex.value - 1, currentPageLastIndex.value);
    });

    // 加上序號（showIndex）
    const itemsWithIndex = computed((): Item[] => {
        if (!showIndex.value) return itemsInPage.value;
        return itemsInPage.value.map((item, idx) => ({
            index: currentPageFirstIndex.value + idx,
            ...item,
        }));
    });

    // 已選取項目的 key 集合
    const selectedKeys = computed((): Set<string> => {
        const set = new Set<string>();
        for (const item of selectItemsComputed.value) set.add(getItemKey(item, itemKey.value));
        return set;
    });

    // 表頭全選的三態
    const multipleSelectStatus = computed((): MultipleSelectStatus => {
        if (selectItemsComputed.value.length === 0) return 'noneSelected';
        const selectable = totalItems.value.filter(item => !disabledRows(item));
        if (selectable.length === 0) return 'noneSelected';
        const keys = selectedKeys.value;
        const allSelected = selectable.every(item => keys.has(getItemKey(item, itemKey.value)));
        return allSelected ? 'allSelected' : 'partSelected';
    });

    // 最終頁面資料（多選時依 key 注入 checkbox 顯示狀態）
    const pageItems = computed((): Item[] => {
        if (!isMultipleSelectable.value) return itemsWithIndex.value;
        const keys = selectedKeys.value;
        return itemsWithIndex.value.map(item => ({
            ...item,
            checkbox: keys.has(getItemKey(item, itemKey.value)) && !disabledRows(item),
        }));
    });

    return {
        currentPageFirstIndex,
        currentPageLastIndex,
        multipleSelectStatus,
        pageItems,
    };
}
