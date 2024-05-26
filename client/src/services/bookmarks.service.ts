import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { IActionSaved, IBookmarks } from "../types/types";

export const bookmarksApi = createApi({
    reducerPath: 'bookmarks',
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
    tagTypes: ['Bookmarks'],
    endpoints: build => ({
        getBookmarks: build.query<IBookmarks, string>({
            query: (query: string) => ({
                url: '/bookmarks',
                params: {
                    query: query
                }
            }),
            providesTags: ['Bookmarks'],
        }),
        addToBookmarks: build.mutation<IActionSaved, IActionSaved>({
            query: (movie: IActionSaved) => ({
                url: '/bookmarks/add',
                method: 'POST',
                body: movie
            }),
            invalidatesTags: ['Bookmarks']
        }),
        removeFromBookmarks: build.mutation<IActionSaved, IActionSaved>({
            query: (movie: IActionSaved) => ({
                url: '/bookmarks/remove',
                method: 'DELETE',
                body: movie
            }),
            invalidatesTags: ['Bookmarks']
        })
    })
})

export const {useGetBookmarksQuery, useAddToBookmarksMutation, useRemoveFromBookmarksMutation} = bookmarksApi;