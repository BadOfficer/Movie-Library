import { createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import ErrorPage from "../pages/ErrorPage"
import Home from "../pages/Home"
import Movies from "../pages/Movies"
import Series from "../pages/Series"
import Liked from "../pages/Liked"
import Bookmarks from "../pages/Bookmarks"
import Settings from "../pages/Settings"
import Auth from "../pages/Auth"
import { ProtectedRoute } from "../components/routes/ProtectedRoute"
import GenresManager from "../pages/GenresManager"
import { RoleProtectedRoute } from "../components/routes/RoleProtectedRoute"
import MoviesManager from "../pages/MoviesManager"
import MovieDetails from "../pages/MovieDetails"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'movies',
                element: <Movies />
            },
            {
                path: 'series',
                element: <Series />
            },
            {
                path: 'liked',
                element: (
                    <ProtectedRoute>
                        <Liked />
                    </ProtectedRoute>
                )
            },
            {
                path: 'bookmarks',
                element: (
                    <ProtectedRoute>
                        <Bookmarks />
                    </ProtectedRoute>
                )
            },
            {
                path: 'profile',
                element: (
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                )
            },
            {
                path: 'auth',
                element: <Auth />
            },
            {
                path: 'genres',
                element: (
                    <RoleProtectedRoute>
                        <GenresManager />
                    </RoleProtectedRoute>
                )
            },
            {
                path: 'movies-list',
                element: (
                    <RoleProtectedRoute>
                        <MoviesManager />
                    </RoleProtectedRoute>
                )
            },
            {
                path: 'movie-details/:id',
                element: <MovieDetails />
            }
        ]
    }
])