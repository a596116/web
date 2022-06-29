import { fileURLToPath, URL } from 'url'
import type { ConfigEnv } from 'vite'
import { setupPlugins } from './vite/plugins'
export default ({ command }: ConfigEnv): any => {
  const isBuild = command === 'build'
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
          // manualChunks(id: string) {
          //   if (id.includes('node_modules')) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
          //   }
          // },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/styles/base.scss";'
        }
      }
    },
    terserOptions: {
      compress: {
        // drop_console: true,
        // drop_debugger: true,
      },
    },
    server: {
      // base: "./ ", //生产环境路径
      proxy: {
        '/api': {
          target: 'http://103.61.139.237:7001',
          changeOrigin: true,
          rewrite: (path: any) => path.replace(/^\/api/, ""),
        }
      },
      // cors: true
    }
  }
}
