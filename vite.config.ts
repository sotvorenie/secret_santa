import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import VueRouter from 'unplugin-vue-router/vite'

export default defineConfig({
    plugins: [
        VueRouter({
            dts: 'src/typed-router.d.ts',
            importMode: 'sync',
        }),
        vue(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': '/src',
            '@api': '/src/api',
            '@icons': '/src/components/icons',
            '@composables': '/src/composables',
            '@data': '/src/data',
            '@store': '/src/store',
            '@utils': '/src/utils',
            '@components': '/src/components/blocks',
            '@ui': '/src/components/ui',
        },
    },
})