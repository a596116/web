import importToCDN from 'vite-plugin-cdn-import'
import type { Plugin } from 'vite'
export const setupCdnPlugin = (plugin: any) => {
  plugin.push(
    importToCDN({
      modules: [
        {
          name: 'lodash',
          var: 'lodash',
          path: `https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js`
        },
        {
          name: 'Typed',
          var: 'Typed',
          path: `https://cdn.jsdelivr.net/npm/typed.js@2.0.12`
        },
      ]
    })
  )
}
