import { fileURLToPath, URL } from 'url'

import { loadEnv, type ConfigEnv } from 'vite'
import { parseEnv } from './vite/util'
import { setupPlugins } from './vite/plugins'

import visualizer from 'rollup-plugin-visualizer'

export default ({ command, mode }: ConfigEnv): any => {
  const isBuild = command === 'build'
  const root = process.cwd()
  const env = parseEnv(loadEnv(mode, root))

  return {
    plugins: [...setupPlugins(isBuild, env), visualizer()],
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
