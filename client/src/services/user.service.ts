import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { IUserData } from "../types/types";

export const userApi = createApi({
    reducerPath: 'userInfo',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers) => {
            const token = getTokenFromLocalStorage();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['User'],
    endpoints: build => ({
        getUser: build.query<IUserData, any>({
            query: () => ({
                url: '/profile/personal-data'
            }),
            providesTags: ['User']
        }),
        updateUserData: build.mutation<any, any>({
            query: (userData: any) => ({
                url: '/profile/personal-data',
                method: 'PATCH',
                body: userData
            }),
            invalidatesTags: ['User']
        })
    })
})

export const {useGetUserQuery, useUpdateUserDataMutation} = userApi;