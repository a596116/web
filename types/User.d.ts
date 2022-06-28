interface IUser {
    id: number
    account: string
    password: string
    token: string
    active: string
    createdAt: string
    updatedAt: string
    name: string
    permissions: any
    avatar?: string
}

interface Login {
    token: string
}