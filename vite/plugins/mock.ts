import { viteMockServe } from 'vite-plugin-mock'
import type { Plugin } from 'vite'
export const setupMockPlugin = (plugin: Plugin[], isBuild: boolean) => {
  plugin.push(
    viteMockServe({
      mockPath: 'mock',
      localEnabled: isBuild,
    })
  )
}
