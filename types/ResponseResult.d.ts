interface responseResult<T> {
    code: number
    message: string
    type: 'success' | 'error'
    result: T
}
