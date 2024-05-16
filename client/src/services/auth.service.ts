import { instance } from "../api/axios.api";
import { IResponseUserLogin, IResponseUserRegistration, IUser, IUserLogin, IUserRegistration } from "../types/types";

export const AuthService = {
    async registration(userData: IUserRegistration): Promise<IResponseUserRegistration | undefined> {
        const {data} = await instance.post<IResponseUserRegistration>('auth/sign-up', userData);
        return data;
    },
    async login(userData: IUserLogin): Promise<IResponseUserLogin | undefined> {
        const {data} = await instance.post<IResponseUserLogin>('auth/sign-in', userData)
        
        return data;
    },
    async getUserData(): Promise<IUser | undefined> {
        const response = await instance.get<IUser>('user');
        if(response) {
            const data = response.data;
            console.log(data);
            
            return data;
        }
    },
}