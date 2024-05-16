import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { IGenre, IGenreInput } from "../types/types";

export const genresApi = createApi({
    reducerPath: 'genres',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
        headers: {
            Authorization: 'Bearer ' + getTokenFromLocalStorage(),
        }
    }),
    tagTypes: ['Genre'],
    endpoints: build => ({
        getGenres: build.query<IGenre[], string>({
            query: (arg: string) => ({  
                url: '/genres',
                params: {
                    query: arg
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