import vue from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'
import visualizer from 'rollup-plugin-visualizer'

import { autoImport } from './autoImport'
import { setupMockPlugin } from './mock'
import { setupCdnPlugin } from './importcdn'
export const setupPlugins = (isBuild: boolean) => {

    const plugins: Plugin[] = [vue(), visualizer()]
    setupMockPlugin(plugins, isBuild)
    autoImport(plugins)
    setupCdnPlugin(plugins)
    return plugins
}
