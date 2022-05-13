import type { Plugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 自動導入包，模塊
export const autoImport = (plugin: Plugin[]) => {
    plugin.push(
        AutoImport({
            resolvers: [ElementPlusResolver()],

            imports: ['vue', 'vue-router', 'pinia',],
            // 為true時在項目根目錄自動創建
            dts: 'types/auto-imports.d.ts',
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            dirs: ['src/components'],
            // 組件名稱包含目錄， 防止同名組件衝突
            directoryAsNamespace: true,
            // 指定類型聲明文件，為true時在項目根目錄創建
            dts: 'types/components.d.ts',
        }),
    )
}