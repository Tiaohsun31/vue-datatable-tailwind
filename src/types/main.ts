// types/main.ts - 主要供外部使用的類型定義
import type { ClickEventType } from './internal'
export type TailwindColor =
    | 'slate'
    | 'gray'
    | 'zinc'
    | 'neutral'
    | 'stone'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose';

export type ThemeVariant = 'light' | 'DEFAULT' | 'dark';
export type TailwindShade = '400' | '500' | '600';

export interface ThemeConfig {
    color: TailwindColor;
    variant?: ThemeVariant;
}

export type TextDirection = 'center' | 'left' | 'right'
export type SortType = 'asc' | 'desc'

// 表頭欄位定義
export interface Header {
    text: string  // 顯示的標題文字
    value: string   // 對應數據的鍵值
    sortable?: boolean  // 是否可排序
    fixed?: boolean  // 是否固定列
    fixedPosition?: 'left' | 'right' // 固定列的位置
    width?: number   // 列寬度
    sortType?: SortType | 'none' // 排序類型
}

// 表格數據
export interface Item {
    [key: string]: any           // 允許任意鍵值對
    key?: string | number        // 可選的唯一標識符
}

// Server選項
export interface ServerOptions {
    page: number                  // 當前頁碼
    rowsPerPage: number          // 每頁筆數
    sortBy?: string | string[]   // 排序欄位
    sortType?: SortType | SortType[] // 排序類型
}

// 過濾器選項
export type FilterComparison = '=' | '!=' | '>' | '>=' | '<' | '<=' | 'between' | 'in';

// 數字過濾
export interface NumberFilterOption {
    field: string
    comparison: '>' | '>=' | '<' | '<=' | 'between'
    criteria: number | [number, number]
}

// 字符串過濾
export interface StringFilterOption {
    field: string
    comparison: '=' | '!='
    criteria: string
}

// 數組過濾選項
export interface ArrayFilterOption {
    field: string
    comparison: 'in'
    criteria: (string | number)[]
}

// 自定義過濾選項
export interface CustomFilterOption {
    field: string
    comparison: (value: any, criteria: any) => boolean
    criteria: any
}

// 簡化的過濾選項 - 為了向後兼容和易用性
export interface SimpleFilterOption {
    field: string;
    comparison: string;
    criteria: any;
}

// 聯合類型 - 允許所有可能的過濾選項類型
export type FilterOption =
    | NumberFilterOption
    | StringFilterOption
    | ArrayFilterOption
    | CustomFilterOption
    | SimpleFilterOption;

// 樣式回調函數類型
export type HeaderItemClassNameFunction = (header: Header, columnNumber: number) => string
export type BodyRowClassNameFunction = (item: Item, rowNumber: number) => string
export type BodyItemClassNameFunction = (column: string, rowNumber: number) => string
export type BodyRowDisabledFunction = (item: Item, rowNumber?: number) => boolean

// 組件實例類型
// /**
//  * DataTable 組件實例類型定義
//  * 包含所有公開方法和屬性
//  */
export interface DataTableInstance {
    // Props 類型
    props: DataTableProps

    // 分頁相關
    currentPageFirstIndex: number  // 當前頁第一筆資料的索引
    currentPageLastIndex: number   // 當前頁最後一筆資料的索引
    clientItemsLength: number      // 客戶端資料總數

    // 分頁狀態
    maxPaginationNumber: number    // 最大頁數
    currentPaginationNumber: number // 當前頁碼
    isLastPage: boolean           // 是否為最後一頁
    isFirstPage: boolean          // 是否為第一頁

    // 分頁控制方法
    nextPage: () => void          // 下一頁
    prevPage: () => void          // 上一頁
    updatePage: (page: number) => void // 更新至指定頁

    // 每頁筆數相關
    rowsPerPageOptions: number[]   // 每頁筆數選項
    rowsPerPageActiveOption: number // 當前每頁筆數
    updateRowsPerPageActiveOption: (option: number) => void // 更新每頁筆數
}

// 組件Props類型
export interface DataTableProps {
    // 核心數據屬性
    /** 表格數據項目 */
    items: Item[]
    /** 表格標題配置 */
    headers: Header[]

    // 分頁相關配置
    /** 當前頁碼 */
    currentPage?: number
    /** 每頁顯示行數 */
    rowsPerPage?: number
    /** 可選的每頁行數選項 */
    rowsItems?: number[]
    /** 隱藏表格底部 */
    hideFooter?: boolean
    /** 隱藏每頁行數選擇器 */
    hideRowsPerPage?: boolean
    /** 每頁行數文本信息 */
    rowsPerPageMessage?: string
    /** 分頁分隔符文本 */
    rowsOfPageSeparatorMessage?: string
    /** 使用按鈕式分頁 */
    buttonsPagination?: boolean,
    /** 隱藏分頁信息 */
    hidePaginationInfo?: boolean

    // 排序和過濾配置
    /** 排序字段 */
    sortBy?: string | string[]
    /** 排序類型 */
    sortType?: SortType | SortType[]
    /** 是否支持多列排序 */
    multiSort?: boolean
    /** 是否必須排序 */
    mustSort?: boolean
    /** 過濾選項配置 */
    filterOptions?: FilterOption[] | null

    // 搜索配置
    /** 搜索字段 */
    searchField?: string | string[]
    /** 搜索值 */
    searchValue?: string

    // 服務端配置
    /** 服務端選項 */
    serverOptions?: ServerOptions | null
    /** 服務端數據總長度 */
    serverItemsLength?: number

    // 表格外觀配置
    /** 主題顏色 */
    theme?: ThemeConfig | string;
    /** 是否使用交替行顏色 */
    alternating?: boolean
    /** 禁用懸停效果 */
    noHover?: boolean
    /** 單元格邊框 */
    borderCell?: boolean
    /** 行邊框 */
    borderRow?: boolean

    // 列配置
    /** 複選框列寬度 */
    checkboxColumnWidth?: number | null
    /** 展開列寬度 */
    expandColumnWidth?: number
    /** 序號列寬度 */
    indexColumnWidth?: number
    /** 顯示序號列 */
    showIndex?: boolean
    /** 序號列符號 */
    showIndexSymbol?: string

    /** 固定展開列 */
    fixedExpand?: boolean
    /** 固定表頭 */
    fixedHeader?: boolean
    /** 固定複選框列 */
    fixedCheckbox?: boolean
    /** 固定序號列 */
    fixedIndex?: boolean

    // 樣式類名配置
    /** 表格包覆層 CSS */
    wrapperClassName?: string,
    /** 內容 CSS 類名 */
    containerClassName?: string,
    /** 表格 CSS 類名 */
    tableClassName?: string,
    /** 表頭 CSS 類名 */
    headerClassName?: string,
    /** 表體 CSS 類名 */
    bodyClassName?: string,
    /** 表頭項目 CSS 類名 */
    headerItemClassName?: HeaderItemClassNameFunction | string
    /** 表體行 CSS 類名 */
    bodyRowClassName?: BodyRowClassNameFunction | string
    /** 展開行 CSS 類名 */
    bodyExpandRowClassName?: BodyRowClassNameFunction | string
    /** 表體項目 CSS 類名 */
    bodyItemClassName?: BodyItemClassNameFunction | string
    /** 表尾 CSS 類名 */
    footerClassName?: string,
    /** 手機表尾 CSS */
    mobileFooterClasses?: string,
    /** 網頁表尾 CSS */
    desktopFooterClasses?: string,

    // 其他配置
    /** 隱藏表頭 */
    hideHeader?: boolean
    /** 已選擇的項目 */
    itemsSelected?: Item[] | null
    /** 點擊行時是否觸發選擇 */
    clickRowToSelect?: boolean;
    /** Disabled行 */
    disabledRows?: BodyRowDisabledFunction
    /** 加載狀態 */
    loading?: boolean
    /** 空數據提示文本 */
    emptyMessage?: string
    /** 點擊事件類型 */
    clickEventType?: ClickEventType
    /** 點擊行展開 */
    clickRowToExpand?: boolean
    /** 表格節點 ID */
    tableNodeId?: string
    /** 阻止行右鍵菜單 */
    preventContextMenuRow?: boolean,
    /** 指定展開按鈕所在列 */
    expandColumn?: string;
    /** 是否啟用展開過渡效果 */
    expandTransition?: boolean
    /** 批量選擇閾值 */
    batchSelectionThreshold?: number,
}

export type ClickRowArgument = Item & {
    isSelected?: boolean
    indexInCurrentPage?: number
}

export type UpdateSortArgument = {
    sortType: SortType | null
    sortBy: string
}

export interface PaginationInfo {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPaginationNumber: number;
    maxPaginationNumber: number;
    nextPage: () => void;
    prevPage: () => void;
}

// export interface UseHeadersOptions {
//     headers: Ref<Header[]>
//     sortBy: Ref<string | string[]>
//     sortType: Ref<SortType | SortType[]>
//     multiSort: ComputedRef<boolean>
//     mustSort: ComputedRef<boolean>
// }

// export interface UseRowsOptions {
//     rowsPerPage: Ref<number>
//     rowsItems: ComputedRef<number[]>
//     serverOptions: Ref<ServerOptions | null>
// }

// export interface UsePaginationOptions {
//     currentPage: Ref<number>
//     rowsPerPage: Ref<number>
//     totalItems: ComputedRef<number>
//     serverOptions: Ref<ServerOptions | null>
// }

// export interface UseTotalItemsOptions {
//     items: Ref<Item[]>
//     currentPaginationNumber: Ref<number>
//     rowsPerPage: Ref<number>
//     sortBy: Ref<string | string[]>
//     sortType: Ref<SortType | SortType[]>
//     filterOptions: Ref<FilterOption[]>
//     searchField: Ref<string | string[]>
//     searchValue: Ref<string>
//     serverItemsLength: ComputedRef<number>
//     isServerMode: ComputedRef<boolean>
// }

// export interface UseSortOptions {
//     sortBy: Ref<string | string[]>
//     sortType: Ref<SortType | SortType[]>
//     multiSort: ComputedRef<boolean>
//     emit: (event: string, ...args: any[]) => void
// }


// export type Item = Record<string, any>

// export type Header = {
//     text: string
//     value: string
//     sortable?: boolean
//     fixed?: boolean
//     width?: number
// }

// export type ServerOptions = {
//     page: number
//     rowsPerPage: number
//     sortBy?: string | string[]
//     sortType?: SortType | SortType[]
// }

// #region 輔助型別檢查函數
// export function isNumberFilterOption(option: FilterOption): option is NumberFilterOption {
//     return ['>', '>=', '<', '<=', 'between'].includes(option.comparison as string)
// }

// export function isArrayFilterOption(option: FilterOption): option is ArrayFilterOption {
//     return option.comparison === 'in'
// }

// export function isCustomFilterOption(option: FilterOption): option is CustomFilterOption {
//     return typeof option.comparison === 'function'
// }

// export function isNumeric(value: any): value is number {
//     return typeof value === 'number' && !isNaN(value)
// }

//  輔助函數 - 幫助創建過濾器 - 使代碼更易讀
// export const createFilter = {
//     number(field: string, comparison: NumberFilterOption['comparison'], criteria: number | [number, number]): NumberFilterOption {
//         return { field, comparison, criteria };
//     },

//     string(field: string, comparison: StringFilterOption['comparison'], criteria: string): StringFilterOption {
//         return { field, comparison, criteria };
//     },

//     array(field: string, criteria: (string | number)[]): ArrayFilterOption {
//         return { field, comparison: 'in', criteria };
//     },

//     custom<T = any>(
//         field: string,
//         comparison: (value: any, criteria: T) => boolean,
//         criteria: T
//     ): CustomFilterOption {
//         return { field, comparison, criteria };
//     }
// };
// #endregion
