import { Ref, ComputedRef } from 'vue';
import { ServerOptions } from '../types/main';
export default function useRows(isServerSideMode: Ref<boolean>, rowsItems: Ref<number[]>, serverOptions: Ref<ServerOptions | null>, rowsPerPage: Ref<number>): {
    rowsItemsComputed: ComputedRef<number[]>;
    rowsPerPageRef: Ref<number, number>;
    updateRowsPerPage: (option: number) => void;
};
//# sourceMappingURL=useRows.d.ts.map