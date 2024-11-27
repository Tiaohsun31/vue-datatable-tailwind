import '../src/styles/theme.css'
import type { App } from 'vue'
import DataTable from './DataTable.vue'
export { createFilter } from './utils/filter'

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
    ThemeConfig,

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

    // 過濾器相關類型
    NumberFilterOption,
    StringFilterOption,
    ArrayFilterOption,
    CustomFilterOption,
    SimpleFilterOption,

    // 事件相關類型
    ClickRowArgument,
    UpdateSortArgument
} from './types/main'


DataTable.install = install
