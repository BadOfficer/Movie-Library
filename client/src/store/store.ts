import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { genresApi } from '../services/genres.service'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [genresApi.reducerPath]: genresApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(genresApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch