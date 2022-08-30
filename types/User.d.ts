interface IUser {
    id?: number
    name: string
    account: string
    password: string
    avatar?: string
    active: string
    permissions: any
    createdAt?: string
    updatedAt?: string
}

interface Login {
    token: string
    userAccount: string
}