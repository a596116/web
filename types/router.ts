import 'vue-router'
import type { IMenu } from './menu'
declare module 'vue-router' {
    interface RouteMeta {
        auth?: boolean
        guest?: boolean

        menu?: IMenu
        permission?: string
        number?: number

        page?: { auth: boolean, name: string, menu: IMenu }
        enterClass?: string
        leaveClass?: string
    }
}
