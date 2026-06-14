import { Ref, WritableComputedRef } from 'vue';
import { SortType, ServerOptions } from '../types/main';
import { ServerOptionsComputed, EmitsEventName } from '../types/internal';
export default function useServerOptions(serverOptions: Ref<ServerOptions | null>, multiSort: Ref<Boolean>, emits: (event: EmitsEventName, ...args: any[]) => void): {
    serverOptionsComputed: WritableComputedRef<ServerOptionsComputed | null, ServerOptionsComputed | null>;
    updateServerOptionsPage: (page: number) => void;
    updateServerOptionsSort: (newSortBy: string, newSortType: SortType | null) => void;
    updateServerOptionsRowsPerPage: (rowsPerPage: number) => void;
};
//# sourceMappingURL=useServerOptions.d.ts.map