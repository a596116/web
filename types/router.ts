import 'vue-router'
import type { IMenu } from './menu'

declare module 'vue-router' {
    interface RouteMeta {
        auth?: boolean
        guest?: boolean

        menu?: IMenu

        permission?: string

        enterClass?: string
        leaveClass?: string
    }
}
