interface ViteEnv {
    VITE_ROUTER_AUTOLOAD: boolean
    VITE_API_URL: string
    // firebase
    VITE_API_KEY: string
    VITE_AUTH_DOMAIN: string
    VITE_PROJECT_ID: string
    VITE_STORAGE_BUCKET: string
    VITE_MESSAGING_SENDER_ID: string
    VITE_APP_ID: string
    VITE_MEASUREMENT_ID: string
    VITE_BASEURL: string //數據接口
}


interface ImportMeta {
    readonly env: ViteEnv
}
