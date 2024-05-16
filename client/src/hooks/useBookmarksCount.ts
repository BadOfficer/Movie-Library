import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { instance } from "../api/axios.api";
import { IBookmarksCounter } from "../types/types";

export const useBookmarksCount = () => {
    const [bookmarksCount, setBookmarksCount] = useState(0)
    const location = useLocation();

    useEffect(() => {
        const fetchBookmarksCount = async () => {
            if (location.pathname === '/bookmarks') {
              try {
                const { data } = await instance.get<IBookmarksCounter>('/bookmarks');
                setBookmarksCount(data.movies.length)
                console.log(data);
              } catch (error) {
                console.error("Error fetching bookmarks count:", error);
              }
            }
          };
      
          fetchBookmarksCount();
      
          return () => {};
    }, [location])

    return bookmarksCount
}