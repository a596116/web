import type { App } from 'vue'
import { setupPinia } from '../plugins/pinia'
import setupIconPark from "../plugins/iconpark"

import './tailwindcss/tailwindcss.css'
import 'animate.css'
import '../styles/element.scss'
import '../styles/element.css'


export const setupPlugins = (app: App) => {
    setupPinia(app)
    setupIconPark(app)
}

