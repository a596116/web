import type { App } from 'vue'
import { setupPinia } from './pinia'
import setupIconPark from "./iconpark"
// import 'element-plus/dist/index.css'
import './tailwindcss/tailwindcss.css'
import 'animate.css'
import '../styles/element.scss'
import '../styles/element.css'


export const setupPlugins = (app: App) => {
    setupPinia(app)
    setupIconPark(app)
}

