export interface ViteEnv {
    VITE_ROUTER_AUTOLOAD: boolean
    VITE_API_URL: string
}

type ImportMetaEnv = ViteEnv

interface ImportMeta {
    readonly env: ImportMetaEnv
}
