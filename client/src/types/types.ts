export interface IUserRegistration {
    first_name: string
    last_name: string
    email: string
    password: string
}

export interface IResponseUserRegistration {
    id: number | undefined
    first_name: string | undefined
    last_name: string | undefined
    email: string | undefined
    password: string | undefined
    role: string | undefined
}