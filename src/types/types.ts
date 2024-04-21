export type User = {
    id: string;
    email: string;
    password: string;
    role: string;
}

export interface IAuthenticate {
    readonly user: User;
    readonly token: string;
}