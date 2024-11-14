import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        dts({ include: ['src'], rollupTypes: true })
    ],
    build: {
        cssCodeSplit: true,
        lib: {
            entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
            name: 'VueDataTableTailwind',
            fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.cjs'}`
        },
        rollupOptions: {
            external: ['vue', 'tailwindcss'],
            output: {
                globals: {
                    vue: 'Vue',
                    tailwindcss: 'tailwindcss'
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
})
