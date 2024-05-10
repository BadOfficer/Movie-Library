import { instance } from "../api/axios.api";
import { IResponseUserRegistration, IUserRegistration } from "../types/types";

export const AuthService = {
    async registration(userData: IUserRegistration): Promise<IResponseUserRegistration | undefined> {
        const {data} = await instance.post<IResponseUserRegistration>('auth/sign-up', userData);
        return data;
    },
    async login() {},
    async getMe() {},
}