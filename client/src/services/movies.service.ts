import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie, IMoviesResponse } from "../types/types";

export const moviesApi = createApi({
    reducerPath: 'movies',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000',
    }),
    tagTypes: ['Movies'],
    endpoints: build => ({
        getMovies: build.query<IMoviesResponse<IMovie[]>, string>({
            query: (arg: string) => ({  
                url: '/movies/films',
                params: {
                    count: arg.split(',')[0],
                    offset: arg.split(',')[1],
                    release: arg.split(',')[2],
                    duration: arg.split(',')[3],
                    rating: arg.split(',')[4],
                    query: arg.split(',')[5],
                    genresIds: arg.split(',')[6]
                }
            }),
            providesTags: ['Movies']
        }),
        getAllowFilms: build.query<IMoviesResponse<IMovie[]>, string>({
            query: () => ({  
                url: '/movies/films',
            }),
            providesTags: ['Movies']
        }),
        getMovieByTitle: build.query<IMovie, string>({
            query: (title: string) => ({
                url: `/movies/details/${title}`,
                params: {
                    title
                }
            }),
            providesTags: ['Movies']
        })
    })
})

export const { useGetMoviesQuery, useGetAllowFilmsQuery, useGetMovieByTitleQuery } = moviesApi