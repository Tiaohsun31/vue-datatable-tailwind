// vue-datatable-tailwind.d.ts

declare module 'vue-datatable-tailwind' {
    import type { App } from 'vue'
    import { DataTableSlots } from './slot'
    import type { DefineComponent } from 'vue'

    export * from './types/main'
    export { createFilter } from '../utils/filter'
    export const DataTable: DefineComponent<
        DataTableProps, // props 類型
        DataTableSlots  // slots 類型
    > & DataTableInstance

    // 插件定義
    declare const plugin: {
        install: (app: App) => void
    }

    export default plugin
}
