import { fileURLToPath, URL } from 'url'

import type { ConfigEnv } from 'vite'
import { setupPlugins } from './vite/plugins'

import visualizer from 'rollup-plugin-visualizer'

export default ({ command }: ConfigEnv): any => {
  const isBuild = command === 'build'

  return {
    plugins: [...setupPlugins(isBuild), visualizer()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,

          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
  }
}
