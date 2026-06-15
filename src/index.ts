import './styles/theme.css'
import type { App } from 'vue'
import DataTable from './core/DataTable.vue'
export { createFilter } from './utils/filter'
export { locales } from './i18n'

// 導出組件本身
export default DataTable

// 導出插件安裝函數
export const install = (app: App) => {
    app.component('DataTable', DataTable)
}

// 導出類型
export type {
    // 核心類型
    DataTableProps,
    DataTableInstance,

    // 主題相關
    TailwindColor,

    // i18n
    DataTableLocale,
    LocaleName,

    // 資料相關類型
    Item,
    Header,
    ServerOptions,

    // 功能相關類型
    SortType,
    FilterOption,
    TextDirection,

    // 功能性類型
    HeaderItemClassNameFunction,
    BodyRowClassNameFunction,
    BodyItemClassNameFunction,
    BodyRowDisabledFunction,

    // 分頁資訊（pagination slot / 事件處理用）
    PaginationInfo,

    // 過濾器相關類型
    NumberFilterOption,
    StringFilterOption,
    ArrayFilterOption,
    CustomFilterOption,
    SimpleFilterOption,

    // 事件相關類型
    ClickRowArgument,
    UpdateSortArgument
} from './types/public'

// 插槽型別（供外部標註）
export type { DataTableSlots } from './types/slot'

// update:serverOptions 事件 payload 型別
export type { ServerOptionsComputed } from './types/internal'


DataTable.install = install
