import type { App } from 'vue'
import { setupTailwindcss } from './tailwindcss'
import { setupElementPlus } from './elememtui'
import { setupPinia } from './pinia'
import setupIconPark from "./iconpark"
export const setupPlugins = (app: App) => {
    setupTailwindcss()
    setupElementPlus()
    setupPinia(app)
    setupIconPark(app)
}

