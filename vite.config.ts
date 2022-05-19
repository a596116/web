import { fileURLToPath, URL } from 'url'
import { loadEnv, type ConfigEnv } from 'vite'
import { setupPlugins } from './vite/plugins'
export default ({ command, mode }: ConfigEnv): any => {
  const isBuild = command === 'build'
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return {
    plugins: [...setupPlugins(isBuild)],
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/base.scss";'
        }
      }
    }
  }
}
