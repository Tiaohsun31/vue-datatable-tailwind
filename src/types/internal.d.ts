// 內部使用的類型定義，不導出
import type { SortType, Header, Item } from './main';

// 服務端選項計算結果
export type ServerOptionsComputed = {
    page: number
    rowsPerPage: number
    sortBy: string | string[] | null
    sortType: SortType | SortType[] | null
}

export type HeaderForRender = {
    text: string,
    value: string,
    sortable?: boolean,
    sortType?: SortType | 'none',
    fixed?: boolean,
    width?: number,
}

// 客戶端排序選項
export type ClientSortOptions = {
    sortBy: string | string[],
    sortDesc: boolean | boolean[],
}

// 點擊事件類型
export type ClickEventType = 'single' | 'double'

// 多選狀態
export type MultipleSelectStatus = 'allSelected' | 'noneSelected' | 'partSelected'

// 事件名稱
export type EmitsEventName =
    | 'clickRow'
    | 'selectRow'
    | 'deselectRow'
    | 'expandRow'
    | 'updateSort'
    | 'update:itemsSelected'
    | 'update:serverOptions'
    | 'updateFilter'
    | 'updatePageItems'
    | 'updateTotalItems'
    | 'selectAll'
    | 'updateSelectionStatus'
    | 'contextmenuRow'

export interface ThemeStateClasses {
    base: string;
    hover: string;
    active: string;
    disabled: string;
    hex: string;
    tailwindName: TailwindColor;
    style: Record<string, string>;
}
