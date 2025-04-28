import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss(),
        dts({
            include: ['src/**/*.ts', 'src/**/*.vue'],
            rollupTypes: true,
            copyDtsFiles: true,
            // 確保 Vue 組件的類型也被生成
            staticImport: true,
            // 插入專案的類型引用
            insertTypesEntry: true
        })
    ],
    build: {
        cssCodeSplit: false,
        lib: {
            entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
            name: 'VueDataTableTailwind',
            fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.cjs'}`
        },
        rollupOptions: {
            external: ['vue', 'tailwindcss'],
            output: {
                globals: {
                    vue: 'Vue'
                },
                exports: 'named',
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    server: {
        host: true,
        proxy: {
            '/api': {
                target: 'https://localhost:7183',
                changeOrigin: true,
                secure: false,
            },
        }
    }
})
