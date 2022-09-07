interface IUser {
    id?: number
    name: string
    phone: string
    password: string
    avatar?: string
    active: string
    permissions: any
    createdAt?: string
    updatedAt?: string
}

interface Login {
    token: string
    userPhone: string
}