import { App } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComputedRef } from 'vue';
import { DefineComponent } from 'vue';
import { PublicProps } from 'vue';
import { Ref } from 'vue';

declare const __VLS_component: DefineComponent<DataTableProps, {
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
    updateFilter: (...args: any[]) => void;
    updatePageItems: (...args: any[]) => void;
    updateTotalItems: (...args: any[]) => void;
    selectAll: (...args: any[]) => void;
    updateSelectionStatus: (...args: any[]) => void;
    contextmenuRow: (...args: any[]) => void;
}, string, PublicProps, Readonly<DataTableProps> & Readonly<{
    onClickRow?: (...args: any[]) => any;
    onSelectRow?: (...args: any[]) => any;
    onDeselectRow?: (...args: any[]) => any;
    onExpandRow?: (...args: any[]) => any;
    onUpdateSort?: (...args: any[]) => any;
    "onUpdate:itemsSelected"?: (...args: any[]) => any;
    "onUpdate:serverOptions"?: (...args: any[]) => any;
    onUpdateFilter?: (...args: any[]) => any;
    onUpdatePageItems?: (...args: any[]) => any;
    onUpdateTotalItems?: (...args: any[]) => any;
    onSelectAll?: (...args: any[]) => any;
    onUpdateSelectionStatus?: (...args: any[]) => any;
    onContextmenuRow?: (...args: any[]) => any;
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
    bodyRowClassName: BodyRowClassNameFunction | string;
    loading: boolean;
    bodyExpandRowClassName: BodyRowClassNameFunction | string;
    rowsItems: number[];
    rowsOfPageSeparatorMessage: string;
    hideFooter: boolean;
    hideRowsPerPage: boolean;
    buttonsPagination: boolean;
    footerClassName: string;
    rowsPerPageMessage: string;
    items: Item[];
    currentPage: number;
    mustSort: boolean;
    filterOptions: FilterOption[] | null;
    searchField: string | string[];
    searchValue: string;
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
}, {}, {}, {}, string, ComponentProvideOptions, false, {
    tableWrapper: HTMLDivElement;
    tableContainer: HTMLDivElement;
}, HTMLDivElement>;

declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<number, (_: any) => any>> & Partial<Record<number, (_: any) => any>> & {
        'customize-headers'?(_: {}): any;
        body?(_: {
            [n: number]: Item;
            length: number;
            toString(): string;
            toLocaleString(): string;
            toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
            pop(): Item;
            push(...items: Item[]): number;
            concat(...items: ConcatArray<Item>[]): Item[];
            concat(...items: (Item | ConcatArray<Item>)[]): Item[];
            join(separator?: string): string;
            reverse(): Item[];
            shift(): Item;
            slice(start?: number, end?: number): Item[];
            sort(compareFn?: (a: Item, b: Item) => number): Item[];
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
            find<S extends Item>(predicate: (value: Item, index: number, obj: Item[]) => value is S, thisArg?: any): S;
            find(predicate: (value: Item, index: number, obj: Item[]) => unknown, thisArg?: any): Item;
            findIndex(predicate: (value: Item, index: number, obj: Item[]) => unknown, thisArg?: any): number;
            fill(value: Item, start?: number, end?: number): Item[];
            copyWithin(target: number, start: number, end?: number): Item[];
            entries(): ArrayIterator<[number, Item]>;
            keys(): ArrayIterator<number>;
            values(): ArrayIterator<Item>;
            includes(searchElement: Item, fromIndex?: number): boolean;
            flatMap<U, This = undefined>(callback: (this: This, value: Item, index: number, array: Item[]) => U | readonly U[], thisArg?: This): U[];
            flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
            [Symbol.iterator](): ArrayIterator<Item>;
            [Symbol.unscopables]: {
                [x: number]: boolean;
                length?: boolean;
                toString?: boolean;
                toLocaleString?: boolean;
                pop?: boolean;
                push?: boolean;
                concat?: boolean;
                join?: boolean;
                reverse?: boolean;
                shift?: boolean;
                slice?: boolean;
                sort?: boolean;
                splice?: boolean;
                unshift?: boolean;
                indexOf?: boolean;
                lastIndexOf?: boolean;
                every?: boolean;
                some?: boolean;
                forEach?: boolean;
                map?: boolean;
                filter?: boolean;
                reduce?: boolean;
                reduceRight?: boolean;
                find?: boolean;
                findIndex?: boolean;
                fill?: boolean;
                copyWithin?: boolean;
                entries?: boolean;
                keys?: boolean;
                values?: boolean;
                includes?: boolean;
                flatMap?: boolean;
                flat?: boolean;
                [Symbol.iterator]?: boolean;
                readonly [Symbol.unscopables]?: boolean;
                at?: boolean;
            };
            at(index: number): Item;
        }): any;
        'body-prepend'?(_: {
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
        }): any;
        expand?(_: {
            [key: string]: any;
            key?: string | number;
        }): any;
        'body-append'?(_: {
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
        }): any;
        loading?(_: {}): any;
        'empty-message'?(_: {}): any;
        'pagination-info'?(_: {
            firstIndex: number;
            lastIndex: number;
            total: number;
            separator: string;
        }): any;
        pagination?(_: {
            isFirstPage: boolean;
            isLastPage: boolean;
            currentPaginationNumber: number;
            maxPaginationNumber: number;
            nextPage: () => void;
            prevPage: () => void;
            updatePage: (page: number) => void;
        }): any;
    };
    refs: {
        tableWrapper: HTMLDivElement;
        tableContainer: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};

declare type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare interface ArrayFilterOption {
    field: string;
    comparison: 'in';
    criteria: (string | number)[];
}

export declare type BodyItemClassNameFunction = (column: string, rowNumber: number) => string;

export declare type BodyRowClassNameFunction = (item: Item, rowNumber: number) => string;

declare type BodyRowDisabledFunction = (item: Item, rowNumber?: number) => boolean;

declare type ClickEventType = 'single' | 'double'

export declare type ClickRowArgument = Item & {
    isSelected?: boolean;
    indexInCurrentPage?: number;
};

export declare const createFilter: {
    number(field: string, comparison: NumberFilterOption["comparison"], criteria: number | [number, number]): NumberFilterOption;
    string(field: string, comparison: StringFilterOption["comparison"], criteria: string): StringFilterOption;
    array(field: string, criteria: (string | number)[]): ArrayFilterOption;
    custom<T = any>(field: string, comparison: (value: any, criteria: T) => boolean, criteria: T): CustomFilterOption;
};

export declare interface CustomFilterOption {
    field: string;
    comparison: (value: any, criteria: any) => boolean;
    criteria: any;
}

export declare interface DataTableInstance {
    props: DataTableProps;
    currentPageFirstIndex: number;
    currentPageLastIndex: number;
    clientItemsLength: number;
    maxPaginationNumber: number;
    currentPaginationNumber: number;
    isLastPage: boolean;
    isFirstPage: boolean;
    nextPage: () => void;
    prevPage: () => void;
    updatePage: (page: number) => void;
    rowsPerPageOptions: number[];
    rowsPerPageActiveOption: number;
    updateRowsPerPageActiveOption: (option: number) => void;
}

export declare interface DataTableProps {
    /** 表格數據項目 */
    items: Item[];
    /** 表格標題配置 */
    headers: Header[];
    /** 當前頁碼 */
    currentPage?: number;
    /** 每頁顯示行數 */
    rowsPerPage?: number;
    /** 可選的每頁行數選項 */
    rowsItems?: number[];
    /** 隱藏表格底部 */
    hideFooter?: boolean;
    /** 隱藏每頁行數選擇器 */
    hideRowsPerPage?: boolean;
    /** 每頁行數文本信息 */
    rowsPerPageMessage?: string;
    /** 分頁分隔符文本 */
    rowsOfPageSeparatorMessage?: string;
    /** 使用按鈕式分頁 */
    buttonsPagination?: boolean;
    /** 隱藏分頁信息 */
    hidePaginationInfo?: boolean;
    /** 排序字段 */
    sortBy?: string | string[];
    /** 排序類型 */
    sortType?: SortType | SortType[];
    /** 是否支持多列排序 */
    multiSort?: boolean;
    /** 是否必須排序 */
    mustSort?: boolean;
    /** 過濾選項配置 */
    filterOptions?: FilterOption[] | null;
    /** 搜索字段 */
    searchField?: string | string[];
    /** 搜索值 */
    searchValue?: string;
    /** 服務端選項 */
    serverOptions?: ServerOptions | null;
    /** 服務端數據總長度 */
    serverItemsLength?: number;
    /** 主題顏色 */
    theme?: TailwindColor | string;
    /** 是否使用交替行顏色 */
    alternating?: boolean;
    /** 禁用懸停效果 */
    noHover?: boolean;
    /** 單元格邊框 */
    borderCell?: boolean;
    /** 複選框列寬度 */
    checkboxColumnWidth?: number | null;
    /** 展開列寬度 */
    expandColumnWidth?: number;
    /** 序號列寬度 */
    indexColumnWidth?: number;
    /** 顯示序號列 */
    showIndex?: boolean;
    /** 序號列符號 */
    showIndexSymbol?: string;
    /** 固定展開列 */
    fixedExpand?: boolean;
    /** 固定表頭 */
    fixedHeader?: boolean;
    /** 固定複選框列 */
    fixedCheckbox?: boolean;
    /** 固定序號列 */
    fixedIndex?: boolean;
    /** 表格包覆層 CSS */
    wrapperClassName?: string;
    /** 內容 CSS 類名 */
    containerClassName?: string;
    /** 表格 CSS 類名 */
    tableClassName?: string;
    /** 表頭 CSS 類名 */
    headerClassName?: string;
    /** 表體 CSS 類名 */
    bodyClassName?: string;
    /** 表頭項目 CSS 類名 */
    headerItemClassName?: HeaderItemClassNameFunction | string;
    /** 表體行 CSS 類名 */
    bodyRowClassName?: BodyRowClassNameFunction | string;
    /** 展開行 CSS 類名 */
    bodyExpandRowClassName?: BodyRowClassNameFunction | string;
    /** 表體項目 CSS 類名 */
    bodyItemClassName?: BodyItemClassNameFunction | string;
    /** 表尾 CSS 類名 */
    footerClassName?: string;
    /** 隱藏表頭 */
    hideHeader?: boolean;
    /** 已選擇的項目 */
    itemsSelected?: Item[] | null;
    /** 點擊行時是否觸發選擇 */
    clickRowToSelect?: boolean;
    /** Disabled行 */
    disabledRows?: BodyRowDisabledFunction;
    /** 加載狀態 */
    loading?: boolean;
    /** 空數據提示文本 */
    emptyMessage?: string;
    /** 點擊事件類型 */
    clickEventType?: ClickEventType;
    /** 點擊行展開 */
    clickRowToExpand?: boolean;
    /** 表格節點 ID */
    tableNodeId?: string;
    /** 阻止行右鍵菜單 */
    preventContextMenuRow?: boolean;
    /** 指定展開按鈕所在列 */
    expandColumn?: string;
    /** 是否啟用展開過渡效果 */
    expandTransition?: boolean;
    /** 批量選擇閾值 */
    batchSelectionThreshold?: number;
}

declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;

export declare type FilterOption = NumberFilterOption | StringFilterOption | ArrayFilterOption | CustomFilterOption | SimpleFilterOption;

export declare interface Header {
    text: string;
    value: string;
    sortable?: boolean;
    fixed?: boolean;
    fixedPosition?: 'left' | 'right';
    width?: number;
    sortType?: SortType | 'none';
}

declare type HeaderForRender = {
    text: string,
    value: string,
    sortable?: boolean,
    sortType?: SortType | 'none',
    fixed?: boolean,
    fixedPosition?: 'left' | 'right',
    width?: number,
}

export declare type HeaderItemClassNameFunction = (header: Header, columnNumber: number) => string;

export declare const install: (app: App) => void;

export declare interface Item {
    [key: string]: any;
    key?: string | number;
}

export declare interface NumberFilterOption {
    field: string;
    comparison: '>' | '>=' | '<' | '<=' | 'between';
    criteria: number | [number, number];
}

export declare interface ServerOptions {
    page: number;
    rowsPerPage: number;
    sortBy?: string | string[];
    sortType?: SortType | SortType[];
}

export declare interface SimpleFilterOption {
    field: string;
    comparison: string;
    criteria: any;
}

export declare type SortType = 'asc' | 'desc';

export declare interface StringFilterOption {
    field: string;
    comparison: '=' | '!=';
    criteria: string;
}

export declare type TailwindColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose';

export declare type TextDirection = 'center' | 'left' | 'right';

export declare type UpdateSortArgument = {
    sortType: SortType | null;
    sortBy: string;
};

export { }
