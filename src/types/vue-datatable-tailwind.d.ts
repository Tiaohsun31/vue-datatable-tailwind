// vue-datatable-tailwind.d.ts
declare module 'vue-datatable-tailwind' {
    import type { App } from 'vue'

    export * from './types/main'
    export { createFilter } from '../utils/filter'
    // 導出組件
    export const DataTable: new () => DataTableInstance

    // 插件定義
    declare const plugin: {
        install: (app: App) => void
    }

    export default plugin
}
