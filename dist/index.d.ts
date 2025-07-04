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
    onClickRow?: ((...args: any[]) => any) | undefined;
    onSelectRow?: ((...args: any[]) => any) | undefined;
    onDeselectRow?: ((...args: any[]) => any) | undefined;
    onExpandRow?: ((...args: any[]) => any) | undefined;
    onUpdateSort?: ((...args: any[]) => any) | undefined;
    "onUpdate:itemsSelected"?: ((...args: any[]) => any) | undefined;
    "onUpdate:serverOptions"?: ((...args: any[]) => any) | undefined;
    onUpdateFilter?: ((...args: any[]) => any) | undefined;
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
}, {}, {}, {}, string, ComponentProvideOptions, false, any, any>;

declare function __VLS_template(): any;

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
    /** 行邊框 */
    borderRow?: boolean;
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
    /** 手機表尾 CSS */
    mobileFooterClasses?: string;
    /** 網頁表尾 CSS */
    desktopFooterClasses?: string;
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
