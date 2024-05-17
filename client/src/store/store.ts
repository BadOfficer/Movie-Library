import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { genresApi } from '../services/genres.service'
import { moviesApi } from '../services/movies.service'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [genresApi.reducerPath]: genresApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(genresApi.middleware, moviesApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch