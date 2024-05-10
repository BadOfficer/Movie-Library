import { instance } from "../api/axios.api";
import { IResponseUserRegistration, IUser, IUserLogin, IUserRegistration } from "../types/types";

export const AuthService = {
    async registration(userData: IUserRegistration): Promise<IResponseUserRegistration | undefined> {
        const {data} = await instance.post<IResponseUserRegistration>('auth/sign-up', userData);
        return data;
    },
    async login(userData: IUserLogin): Promise<IUser | undefined> {
        const {data} = await instance.post<IUser>('auth/sign-in', userData)
        console.log(data);
        
        return data;
    },
    async getProfile(): Promise<IUser | undefined> {
        const response = await instance.get<IUser>('profile/personal-data');
        if(response) {
            const data = response.data; // Extract data from Axios response
            return data;
        }
    },
}