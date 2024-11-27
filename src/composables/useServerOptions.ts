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
        if (serverOptionsComputed.value) {
            if (multiSort.value && Array.isArray(serverOptionsComputed.value.sortBy)
                && Array.isArray(serverOptionsComputed.value.sortType)) {
                const index = serverOptionsComputed.value.sortBy.findIndex((val: string) => val === newSortBy);
                if (index === -1 && newSortType !== null) {
                    serverOptionsComputed.value.sortBy.push(newSortBy);
                    serverOptionsComputed.value.sortType.push(newSortType);
                }
                if (newSortType === null) {
                    serverOptionsComputed.value.sortBy.splice(index, 1);
                    serverOptionsComputed.value.sortType.splice(index, 1);
                } else {
                    serverOptionsComputed.value.sortType[index] = newSortType;
                }
            } else {
                serverOptionsComputed.value = {
                    ...serverOptionsComputed.value,
                    sortBy: newSortType !== null ? newSortBy : null,
                    sortType: newSortType,
                };
            }
        }
    };

    return {
        serverOptionsComputed,
        updateServerOptionsPage,
        updateServerOptionsSort,
        updateServerOptionsRowsPerPage,
    };
}
