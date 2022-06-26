interface IUser {
    id: string
    account: string
    password: string
    token: string
    active: string
    createdAt: string
    updatedAt: string
    name: string
    permissions: string
    avatar?: string
}

interface Login {
    token: string
}