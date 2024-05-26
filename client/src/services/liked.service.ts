import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { IActionSaved, ILiked } from "../types/types";

export const likedApi = createApi({
    reducerPath: 'liked',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        prepareHeaders: (headers) => {
            const token = getTokenFromLocalStorage();
            if(token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Liked'],
    endpoints: build => ({
        getLiked: build.query<ILiked, string>({
            query: (query: string) => ({
                url: '/liked',
                params: {
                    query: query
                }
            }),
            providesTags: ['Liked'],
        }),
        addToLiked: build.mutation<IActionSaved, IActionSaved>({
            query: (movie: IActionSaved) => ({
                url: '/liked/add',
                method: 'POST',
                body: movie
            }),
            invalidatesTags: ['Liked']
        }),
        removeFromLiked: build.mutation<IActionSaved, IActionSaved>({
            query: (movie: IActionSaved) => ({
                url: '/liked/remove',
                method: 'DELETE',
                body: movie
            }),
            invalidatesTags: ['Liked']
        })
    })
})

export const { useGetLikedQuery, useAddToLikedMutation, useRemoveFromLikedMutation } = likedApi;