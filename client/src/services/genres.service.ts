import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { IGenre, IGenreInput, IGenreResponse } from "../types/types";

export const genresApi = createApi({
    reducerPath: 'genres',
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
    tagTypes: ['Genre'],
    endpoints: build => ({
        getGenres: build.query<IGenreResponse<IGenre[]>, string>({
            query: (arg: string) => ({  
                url: '/genres',
                params: {
                    query: arg.split(',')[0],
                    count: arg.split(',')[1],
                    offset: arg.split(',')[2],
                }
            }),
            providesTags: ['Genre']
        }),
        createGenre: build.mutation<any, any>({
            query: (genre: IGenre) => ({
                url: '/genres/create',
                method: 'POST',
                body: genre
            }),
            invalidatesTags: ['Genre']
        }),
        updateGenre: build.mutation({
            query: (genre: IGenreInput) => ({
                url: `/genres/${genre.id}`,
                method: 'PATCH',
                body: genre
            }),
            invalidatesTags: ['Genre']
        }),
        deleteGenre: build.mutation({
            query: (genreId: number) => ({
                url: `/genres/${genreId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Genre']
        })
    })
})

export const { useGetGenresQuery, useCreateGenreMutation, useUpdateGenreMutation, useDeleteGenreMutation } = genresApi;