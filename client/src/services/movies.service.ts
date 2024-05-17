import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie, IMoviesResponse } from "../types/types";

export const moviesApi = createApi({
    reducerPath: 'movies',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
    }),
    tagTypes: ['Movies'],
    endpoints: build => ({
        getMovies: build.query<IMovie[], string>({
            query: () => ({  
                url: '/movies/films'
            }),
            providesTags: ['Movies']
        }),
    })
})

export const { useGetMoviesQuery } = moviesApi