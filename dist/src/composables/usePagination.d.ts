import { Ref, ComputedRef } from 'vue';
import { ServerOptions } from '../types/main';
export default function usePagination(currentPage: Ref<number>, isServerSideMode: ComputedRef<boolean>, loading: Ref<boolean>, totalItemsLength: Ref<number>, rowsPerPage: Ref<number>, serverOptions: Ref<ServerOptions | null>, updateServerOptionsPage: (page: number) => void): {
    currentPaginationNumber: Ref<number, number>;
    maxPaginationNumber: ComputedRef<number>;
    isLastPage: ComputedRef<boolean>;
    isFirstPage: ComputedRef<boolean>;
    nextPage: () => void;
    prevPage: () => void;
    updatePage: (page: number) => void;
    updateCurrentPaginationNumber: (page: number) => void;
};
//# sourceMappingURL=usePagination.d.ts.map