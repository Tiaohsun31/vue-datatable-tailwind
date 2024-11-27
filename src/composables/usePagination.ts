// src/composables/usePagination.ts
/*
    計算當前頁的數據範圍（起始索引和結束索引）
    處理當前頁的數據項目
    處理多重選擇狀態
    整合數據索引和原始數據
*/
import { ref, type Ref, computed, type ComputedRef } from 'vue';
import type { ServerOptions } from '../types/main';

export default function usePagination(
    currentPage: Ref<number>,
    isServerSideMode: ComputedRef<boolean>,
    loading: Ref<boolean>,
    totalItemsLength: Ref<number>,
    rowsPerPage: Ref<number>,
    serverOptions: Ref<ServerOptions | null>,
    updateServerOptionsPage: (page: number) => void,
) {

    const currentPaginationNumber = ref(serverOptions.value ? serverOptions.value.page : currentPage.value);
    const maxPaginationNumber = computed((): number => Math.ceil(totalItemsLength.value / rowsPerPage.value));
    const isLastPage = computed((): boolean => maxPaginationNumber.value === 0 || (currentPaginationNumber.value === maxPaginationNumber.value));
    const isFirstPage = computed((): boolean => currentPaginationNumber.value === 1);

    const nextPage = () => {
        if (totalItemsLength.value === 0) return;
        if (isLastPage.value) return;
        if (loading.value) return;
        if (isServerSideMode.value) {
            const nextPaginationNumber = currentPaginationNumber.value + 1;
            updateServerOptionsPage(nextPaginationNumber);
        } else {
            currentPaginationNumber.value += 1;
        }
    };

    const prevPage = () => {
        if (totalItemsLength.value === 0) return;
        if (isFirstPage.value) return;
        if (loading.value) return;
        if (isServerSideMode.value) {
            const prevPaginationNumber = currentPaginationNumber.value - 1;
            updateServerOptionsPage(prevPaginationNumber);
        } else {
            currentPaginationNumber.value -= 1;
        }
    };

    const updatePage = (page: number) => {
        if (loading.value) return;
        if (isServerSideMode.value) {
            updateServerOptionsPage(page);
        } else {
            currentPaginationNumber.value = page;
        }
    };

    const updateCurrentPaginationNumber = (page: number) => {
        currentPaginationNumber.value = page;
    };

    return {
        currentPaginationNumber,
        maxPaginationNumber,
        isLastPage,
        isFirstPage,
        nextPage,
        prevPage,
        updatePage,
        updateCurrentPaginationNumber,
    };
}
