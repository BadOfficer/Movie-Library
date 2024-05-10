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
                element: <Liked />
            },
            {
                path: 'bookmarks',
                element: <Bookmarks />
            },
            {
                path: 'profile',
                element: <Settings />
            },
            {
                path: 'auth',
                element: <Auth />
            },
        ]
    }
])