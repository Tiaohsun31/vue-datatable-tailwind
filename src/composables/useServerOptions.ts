// src/composables/useServerOptions.ts
import { type Ref, computed } from 'vue';
import type { SortType, ServerOptions } from '../types/main';
import type { ServerOptionsComputed, EmitsEventName } from '../types/internal';

export default function useServerOptions(
    serverOptions: Ref<ServerOptions | null>,
    multiSort: Ref<Boolean>,
    emits: (event: EmitsEventName, ...args: any[]) => void,
) {
    const serverOptionsComputed = computed({
        get: (): ServerOptionsComputed | null => {
            if (serverOptions.value) {
                const { page, rowsPerPage, sortBy, sortType } = serverOptions.value;
                return { page, rowsPerPage, sortBy: sortBy ?? null, sortType: sortType ?? null };
            }
            return null;
        },
        set: (value) => {
            emits('update:serverOptions', value);
        },
    });

    // 更新伺服器選項的頁數
    const updateServerOptionsPage = (page: number) => {
        if (serverOptionsComputed.value) {
            serverOptionsComputed.value = {
                ...serverOptionsComputed.value,
                page,
            };
        }
    };

    // 更新伺服器選項的每頁行數，例如 25, 50, 100，預設為 25，同時設置頁數為 1
    const updateServerOptionsRowsPerPage = (rowsPerPage: number) => {
        if (serverOptionsComputed.value) {
            serverOptionsComputed.value = {
                ...serverOptionsComputed.value,
                page: 1,
                rowsPerPage,
            };
        }
    };

    // 更新伺服器選項的排序方式
    const updateServerOptionsSort = (newSortBy: string, newSortType: SortType | null) => {
        const current = serverOptionsComputed.value;
        if (!current) return;

        if (multiSort.value && Array.isArray(current.sortBy) && Array.isArray(current.sortType)) {
            // 以新陣列更新，避免就地改動 props 物件
            const sortBy = [...current.sortBy];
            const sortType = [...current.sortType] as SortType[];
            const index = sortBy.findIndex((val) => val === newSortBy);

            if (index === -1) {
                if (newSortType !== null) {
                    sortBy.push(newSortBy);
                    sortType.push(newSortType);
                }
            } else if (newSortType === null) {
                sortBy.splice(index, 1);
                sortType.splice(index, 1);
            } else {
                sortType[index] = newSortType;
            }

            serverOptionsComputed.value = { ...current, sortBy, sortType };
        } else {
            serverOptionsComputed.value = {
                ...current,
                sortBy: newSortType !== null ? newSortBy : null,
                sortType: newSortType,
            };
        }
    };

    return {
        serverOptionsComputed,
        updateServerOptionsPage,
        updateServerOptionsSort,
        updateServerOptionsRowsPerPage,
    };
}
