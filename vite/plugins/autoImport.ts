import type { Plugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

// 自動導入包，模塊
export const autoImport = (plugin: Plugin[]) => {
    plugin.push(
        AutoImport({
            resolvers: [ElementPlusResolver()],
            imports: ['vue', 'vue-router', 'pinia', '@vueuse/core',
                {
                    '@/utils': [
                        'env',  // import { env } from '@/utils',
                        // ['env', 'myenv'] // import { env as myenv } from '@/utils',
                    ],
                    // 'axios': [
                    //     // default imports
                    //     ['default', 'axios'], // import { default as axios } from 'axios',
                    // ],
                },

            ],
            // 為true時在項目根目錄自動創建
            dts: 'types/auto-imports.d.ts',
        }),
        Components({
            resolvers: [
                ElementPlusResolver(),
                VueUseComponentsResolver(),
                (componentName) => {
                    if (componentName.startsWith('Icon')) {
                        return { name: componentName.slice(4), from: '@icon-park/vue-next' }
                    }
                }],
            dirs: ['src/components'],
            // 組件名稱包含目錄， 防止同名組件衝突
            directoryAsNamespace: true,
            // 指定類型聲明文件，為true時在項目根目錄創建
            dts: 'types/components.d.ts',
            // 组件的有效文件扩展名。
            extensions: ['vue'],
        }),
    )
}