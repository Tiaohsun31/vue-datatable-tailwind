import type { App } from 'vue'
import DataTable from './components/DataTable.vue'

export { DataTable }

export default {
    install: (app: App) => {
        app.component('DataTable', DataTable)
    }
}
