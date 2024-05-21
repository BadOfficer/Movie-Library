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

        getSeries: build.query<IMoviesResponse<IMovie[]>, string>({
            query: (arg: string) => ({
                url: '/movies/series-films',
                params: {
                    count: arg.split(',')[0],
                    offset: arg.split(',')[1],
                    release: arg.split(',')[2],
                    duration: arg.split(',')[3],
                    rating: arg.split(',')[4],
                    query: arg.split(',')[5],
                    genresIds: arg.split(',')[6],
                    series: arg.split(',')[7],
                    seasons: arg.split(',')[8]
                }
            })
        }),
        getAllowFilms: build.query<IMoviesResponse<IMovie[]>, string>({
            query: () => ({  
                url: '/movies/films',
            }),
            providesTags: ['Movies']
        }),
        getAllowSeries: build.query<IMoviesResponse<IMovie[]>, string>({
            query: () => ({  
                url: '/movies/series-films',
            }),
            providesTags: ['Movies']
        }),
        getMovieByID: build.query<IMovie, string>({
            query: (id: string) => ({
                url: `/movies/${id}`,
                params: {
                    id
                }
            }),
            providesTags: ['Movies']
        }),
        getSlierMovies: build.query<IMovie[], string>({
            query: () => ({
                url: '/movies/slider',
            }),
            providesTags: ['Movies']
        }),
        getRecentlyFilms: build.query<IMovie[], string>({
            query: () => ({
                url: '/movies/last-films'
            }),
            providesTags: ['Movies']
        }),
        getRecentlySeries: build.query<IMovie[], string>({
            query: () => ({
                url: '/movies/last-series'
            }),
            providesTags: ['Movies']
        }),
    })
})

export const { useGetMoviesQuery, useGetAllowFilmsQuery, useGetMovieByIDQuery, useGetSeriesQuery, useGetAllowSeriesQuery, useGetSlierMoviesQuery, useGetRecentlyFilmsQuery, useGetRecentlySeriesQuery } = moviesApi