import { Role } from "./role.enum";

export interface UserIf {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    role?: Role;
}

export interface GetProfileIf {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}

export interface DeleteProfileIf {
    password: string;
}