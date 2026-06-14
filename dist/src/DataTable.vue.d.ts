import { Header, Item, DataTableProps, BodyRowDisabledFunction } from './types/main';
import { HeaderForRender, ClickEventType, MultipleSelectStatus } from './types/internal';
import { DefineComponent, ComputedRef, Ref, ComponentOptionsMixin, PublicProps, ComponentProvideOptions } from 'vue';
import { SortType, HeaderItemClassNameFunction, BodyItemClassNameFunction, BodyRowClassNameFunction, FilterOption, ServerOptions, TailwindColor } from '.';
declare var __VLS_1: {}, __VLS_14: string, __VLS_15: {
    header: HeaderForRender;
    index: number;
    sortable: boolean | undefined;
}, __VLS_17: {
    [n: number]: Item;
    length: number;
    toString(): string;
    toLocaleString(): string;
    toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
    pop(): Item | undefined;
    push(...items: Item[]): number;
    concat(...items: ConcatArray<Item>[]): Item[];
    concat(...items: (Item | ConcatArray<Item>)[]): Item[];
    join(separator?: string): string;
    reverse(): Item[];
    shift(): Item | undefined;
    slice(start?: number, end?: number): Item[];
    sort(compareFn?: ((a: Item, b: Item) => number) | undefined): Item[];
    splice(start: number, deleteCount?: number): Item[];
    splice(start: number, deleteCount: number, ...items: Item[]): Item[];
    unshift(...items: Item[]): number;
    indexOf(searchElement: Item, fromIndex?: number): number;
    lastIndexOf(searchElement: Item, fromIndex?: number): number;
    every<S extends Item>(predicate: (value: Item, index: number, array: Item[]) => value is S, thisArg?: any): this is S[];
    every(predicate: (value: Item, index: number, array: Item[]) => unknown, thisArg?: any): boolean;
    some(predicate: (value: Item, index: number, array: Item[]) => unknown, thisArg?: any): boolean;
    forEach(callbackfn: (value: Item, index: number, array: Item[]) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: Item, index: number, array: Item[]) => U, thisArg?: any): U[];
    filter<S extends Item>(predicate: (value: Item, index: number, array: Item[]) => value is S, thisArg?: any): S[];
    filter(predicate: (value: Item, index: number, array: Item[]) => unknown, thisArg?: any): Item[];
    reduce(callbackfn: (previousValue: Item, currentValue: Item, currentIndex: number, array: Item[]) => Item): Item;
    reduce(callbackfn: (previousValue: Item, currentValue: Item, currentIndex: number, array: Item[]) => Item, initialValue: Item): Item;
    reduce<U>(callbackfn: (previousValue: U, currentValue: Item, currentIndex: number, array: Item[]) => U, initialValue: U): U;
    reduceRight(callbackfn: (previousValue: Item, currentValue: Item, currentIndex: number, array: Item[]) => Item): Item;
    reduceRight(callbackfn: (previousValue: Item, currentValue: Item, currentIndex: number, array: Item[]) => Item, initialValue: Item): Item;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: Item, currentIndex: number, array: Item[]) => U, initialValue: U): U;
    find<S extends Item>(predicate: (value: Item, index: number, obj: Item[]) => value is S, thisArg?: any): S | undefined;
    find(predicate: (value: Item, index: number, obj: Item[]) => unknown, thisArg?: any): Item | undefined;
    findIndex(predicate: (value: Item, index: number, obj: Item[]) => unknown, thisArg?: any): number;
    fill(value: Item, start?: number, end?: number): Item[];
    copyWithin(target: number, start: number, end?: number): Item[];
    entries(): ArrayIterator<[number, Item]>;
    keys(): ArrayIterator<number>;
    values(): ArrayIterator<Item>;
    includes(searchElement: Item, fromIndex?: number): boolean;
    flatMap<U, This = undefined>(callback: (this: This, value: Item, index: number, array: Item[]) => U | readonly U[], thisArg?: This | undefined): U[];
    flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
    at(index: number): Item | undefined;
    [Symbol.iterator](): ArrayIterator<Item>;
    [Symbol.unscopables]: {
        [x: number]: boolean | undefined;
        length?: boolean | undefined;
        toString?: boolean | undefined;
        toLocaleString?: boolean | undefined;
        pop?: boolean | undefined;
        push?: boolean | undefined;
        concat?: boolean | undefined;
        join?: boolean | undefined;
        reverse?: boolean | undefined;
        shift?: boolean | undefined;
        slice?: boolean | undefined;
        sort?: boolean | undefined;
        splice?: boolean | undefined;
        unshift?: boolean | undefined;
        indexOf?: boolean | undefined;
        lastIndexOf?: boolean | undefined;
        every?: boolean | undefined;
        some?: boolean | undefined;
        forEach?: boolean | undefined;
        map?: boolean | undefined;
        filter?: boolean | undefined;
        reduce?: boolean | undefined;
        reduceRight?: boolean | undefined;
        find?: boolean | undefined;
        findIndex?: boolean | undefined;
        fill?: boolean | undefined;
        copyWithin?: boolean | undefined;
        entries?: boolean | undefined;
        keys?: boolean | undefined;
        values?: boolean | undefined;
        includes?: boolean | undefined;
        flatMap?: boolean | undefined;
        flat?: boolean | undefined;
        at?: boolean | undefined;
        [Symbol.iterator]?: boolean | undefined;
        readonly [Symbol.unscopables]?: boolean | undefined;
    };
}, __VLS_19: {
    items: Item[];
    pagination: {
        isFirstPage: boolean;
        isLastPage: boolean;
        currentPaginationNumber: number;
        maxPaginationNumber: number;
        nextPage: () => void;
        prevPage: () => void;
    };
    headers: HeaderForRender[];
}, __VLS_35: string, __VLS_36: any, __VLS_44: {
    [key: string]: any;
    key?: string | number;
}, __VLS_46: {
    items: Item[];
    pagination: {
        isFirstPage: boolean;
        isLastPage: boolean;
        currentPaginationNumber: number;
        maxPaginationNumber: number;
        nextPage: () => void;
        prevPage: () => void;
        updatePage: (page: number) => void;
    };
    headers: HeaderForRender[];
}, __VLS_48: {}, __VLS_55: {}, __VLS_57: {
    currentPaginationNumber: number;
    maxPaginationNumber: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPageFirstIndex: number;
    currentPageLastIndex: number;
    totalItemsLength: number;
    rowsPerPage: number;
    rowsItems: number[];
    rowsPerPageMessage: string;
    rowsOfPageSeparatorMessage: string;
    hideRowsPerPage: boolean;
    hidePaginationInfo: boolean;
    buttonsPagination: boolean;
    nextPage: () => void;
    prevPage: () => void;
    updatePage: (page: number) => void;
    updateRowsPerPage: (option: number) => void;
    items: Item[];
    headers: HeaderForRender[];
    selectedItems: Item[];
    multipleSelectStatus: MultipleSelectStatus;
    theme: string;
}, __VLS_72: string, __VLS_73: any;
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_14>]?: (props: typeof __VLS_15) => any;
} & {
    [K in NonNullable<typeof __VLS_35>]?: (props: typeof __VLS_36) => any;
} & {
    [K in NonNullable<typeof __VLS_72>]?: (props: typeof __VLS_73) => any;
} & {
    'customize-headers'?: (props: typeof __VLS_1) => any;
} & {
    body?: (props: typeof __VLS_17) => any;
} & {
    'body-prepend'?: (props: typeof __VLS_19) => any;
} & {
    expand?: (props: typeof __VLS_44) => any;
} & {
    'body-append'?: (props: typeof __VLS_46) => any;
} & {
    loading?: (props: typeof __VLS_48) => any;
} & {
    'empty-message'?: (props: typeof __VLS_55) => any;
} & {
    'footer-content'?: (props: typeof __VLS_57) => any;
};
declare const __VLS_base: DefineComponent<DataTableProps, {
    currentPageFirstIndex: ComputedRef<number>;
    currentPageLastIndex: ComputedRef<number>;
    clientItemsLength: ComputedRef<number>;
    maxPaginationNumber: ComputedRef<number>;
    currentPaginationNumber: Ref<number, number>;
    isLastPage: ComputedRef<boolean>;
    isFirstPage: ComputedRef<boolean>;
    nextPage: () => void;
    prevPage: () => void;
    updatePage: (page: number) => void;
    rowsPerPageOptions: ComputedRef<number[]>;
    rowsPerPageActiveOption: Ref<number, number>;
    updateRowsPerPageActiveOption: (option: number) => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    clickRow: (...args: any[]) => void;
    selectRow: (...args: any[]) => void;
    deselectRow: (...args: any[]) => void;
    expandRow: (...args: any[]) => void;
    updateSort: (...args: any[]) => void;
    "update:itemsSelected": (...args: any[]) => void;
    "update:serverOptions": (...args: any[]) => void;
    updatePageItems: (...args: any[]) => void;
    updateTotalItems: (...args: any[]) => void;
    selectAll: (...args: any[]) => void;
    updateSelectionStatus: (...args: any[]) => void;
    contextmenuRow: (...args: any[]) => void;
}, string, PublicProps, Readonly<DataTableProps> & Readonly<{
    onClickRow?: ((...args: any[]) => any) | undefined;
    onSelectRow?: ((...args: any[]) => any) | undefined;
    onDeselectRow?: ((...args: any[]) => any) | undefined;
    onExpandRow?: ((...args: any[]) => any) | undefined;
    onUpdateSort?: ((...args: any[]) => any) | undefined;
    "onUpdate:itemsSelected"?: ((...args: any[]) => any) | undefined;
    "onUpdate:serverOptions"?: ((...args: any[]) => any) | undefined;
    onUpdatePageItems?: ((...args: any[]) => any) | undefined;
    onUpdateTotalItems?: ((...args: any[]) => any) | undefined;
    onSelectAll?: ((...args: any[]) => any) | undefined;
    onUpdateSelectionStatus?: ((...args: any[]) => any) | undefined;
    onContextmenuRow?: ((...args: any[]) => any) | undefined;
}>, {
    sortBy: string | string[];
    sortType: SortType | SortType[];
    rowsPerPage: number;
    headerItemClassName: HeaderItemClassNameFunction | string;
    multiSort: boolean;
    headers: Header[];
    hideHeader: boolean;
    fixedHeader: boolean;
    headerClassName: string;
    borderCell: boolean;
    expandColumn: string;
    bodyItemClassName: BodyItemClassNameFunction | string;
    alternating: boolean;
    noHover: boolean;
    borderRow: boolean;
    bodyRowClassName: BodyRowClassNameFunction | string;
    loading: boolean;
    bodyExpandRowClassName: BodyRowClassNameFunction | string;
    rowsItems: number[];
    rowsOfPageSeparatorMessage: string;
    hideRowsPerPage: boolean;
    buttonsPagination: boolean;
    footerClassName: string;
    mobileFooterClasses: string;
    desktopFooterClasses: string;
    rowsPerPageMessage: string;
    items: Item[];
    currentPage: number;
    hideFooter: boolean;
    mustSort: boolean;
    filterOptions: FilterOption[] | null;
    searchField: string | string[];
    searchValue: string;
    searchType: "contains" | "regex";
    serverOptions: ServerOptions | null;
    serverItemsLength: number;
    theme: TailwindColor | string;
    checkboxColumnWidth: number | null;
    expandColumnWidth: number;
    indexColumnWidth: number;
    showIndex: boolean;
    showIndexSymbol: string;
    fixedExpand: boolean;
    fixedCheckbox: boolean;
    fixedIndex: boolean;
    wrapperClassName: string;
    containerClassName: string;
    tableClassName: string;
    bodyClassName: string;
    itemsSelected: Item[] | null;
    clickRowToSelect: boolean;
    disabledRows: BodyRowDisabledFunction;
    emptyMessage: string;
    clickEventType: ClickEventType;
    clickRowToExpand: boolean;
    tableNodeId: string;
    preventContextMenuRow: boolean;
    expandTransition: boolean;
    batchSelectionThreshold: number;
}, {}, {}, {}, string, ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=DataTable.vue.d.ts.map