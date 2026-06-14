import { Ref, ComputedRef, WritableComputedRef } from 'vue';
import { Header, SortType } from '../types/main';
import { ServerOptionsComputed, HeaderForRender, ClientSortOptions, EmitsEventName } from '../types/internal';
export default function useHeaders(showIndexSymbol: Ref<string>, checkboxColumnWidth: Ref<number | null>, expandColumnWidth: Ref<number>, fixedCheckbox: Ref<boolean>, fixedExpand: Ref<boolean>, fixedIndex: Ref<boolean>, headers: Ref<Header[]>, ifHasExpandSlot: ComputedRef<boolean>, indexColumnWidth: Ref<number>, isMultipleSelectable: ComputedRef<boolean>, isServerSideMode: ComputedRef<boolean>, mustSort: Ref<boolean>, serverOptionsComputed: WritableComputedRef<ServerOptionsComputed | null>, showIndex: Ref<boolean>, sortBy: Ref<string | string[]>, sortType: Ref<SortType | SortType[]>, multiSort: Ref<boolean>, expandColumn: Ref<string>, updateServerOptionsSort: (newSortBy: string, newSortType: SortType | null) => void, emits: (event: EmitsEventName, ...args: any[]) => void): {
    clientSortOptions: Ref<{
        sortBy: string | string[];
        sortDesc: boolean | boolean[];
    } | null, ClientSortOptions | {
        sortBy: string | string[];
        sortDesc: boolean | boolean[];
    } | null>;
    headerColumns: ComputedRef<string[]>;
    headersForRender: ComputedRef<HeaderForRender[]>;
    updateSortField: (newSortBy: string, oldSortType: SortType | "none") => void;
    isMultiSorting: ComputedRef<(headerText: string) => boolean>;
    getMultiSortNumber: ComputedRef<(headerText: string) => number | false>;
};
//# sourceMappingURL=useHeaders.d.ts.map