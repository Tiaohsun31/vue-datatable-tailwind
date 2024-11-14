import type { App } from 'vue'
import DataTable from './components/DataTable.vue'

export { DataTable }

export default {
    install: (app: App) => {
        app.component('DataTable', DataTable)
    }
}

export type {
    SortType,
    FilterOption,
    Item,
    Header,
    ServerOptions,
} from './types/main'

export type {
    DataTableProps
} from './types/propsWithDefault'
