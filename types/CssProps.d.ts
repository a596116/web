declare module 'vue' {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }

    // interface ComponentCustomProps {
    //     hello: string
    // }
}

export { }