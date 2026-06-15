import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// 型別宣告由 build:types（vue-tsc -p tsconfig.build.json）產生，不在 vite build 內處理。
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        tailwindcss(),
    ],
    build: {
        cssCodeSplit: false,
        // 不把 public/（favicon 等）複製進 dist：函式庫發佈不需要這些資產（dev server 仍會服務）。
        copyPublicDir: false,
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
