// src/composables/useRows.ts
import { ref, type Ref, computed } from 'vue';
import type { ServerOptions } from '../types/main';

// 用於計算每頁行數選項
export default function useRows(
    isServerSideMode: Ref<boolean>,
    rowsItems: Ref<number[]>,
    serverOptions: Ref<ServerOptions | null>,
    rowsPerPage: Ref<number>,
) {
    const rowsItemsComputed = computed((): number[] => {
        // 如果是客戶端模式，並且每頁行數選項中不包含當前每頁行數，則將當前每頁行數加入選項中
        if (!isServerSideMode.value && rowsItems.value.findIndex((item) => item === rowsPerPage.value) === -1) {
            return [rowsPerPage.value, ...rowsItems.value];
        }
        return rowsItems.value;
    });

    const rowsPerPageRef = ref<number>(serverOptions.value?.rowsPerPage ?? rowsPerPage.value)

    const updateRowsPerPage = (option: number) => {
        rowsPerPageRef.value = option;
    };

    return {
        rowsItemsComputed, // 計算後的每頁行數選項
        rowsPerPageRef, // 每頁行數
        updateRowsPerPage, // 更新每頁行數
    };
}
