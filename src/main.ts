import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupPlugins } from './plugins'

import 'vue-cropper/dist/index.css'
async function main() {
  const app = createApp(App)
  setupPlugins(app)
  setupRouter(app)

  await router.isReady()
  app.mount('#app')
}
main()
