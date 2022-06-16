interface IUser {
    account: string
    password: string
    token: string
    active: boolean
    date: string
    name: string
    permissions: Array<string>
    avatar?: string
}
