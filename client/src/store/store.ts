import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { genresApi } from '../services/genres.service'
import { moviesApi } from '../services/movies.service'
import { userApi } from '../services/user.service'
import { likedApi } from '../services/liked.service'
import { bookmarksApi } from '../services/bookmarks.service'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [likedApi.reducerPath]: likedApi.reducer,
    [bookmarksApi.reducerPath]: bookmarksApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(genresApi.middleware, moviesApi.middleware, userApi.middleware, likedApi.middleware, bookmarksApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch