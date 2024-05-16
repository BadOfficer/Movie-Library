import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { instance } from "../api/axios.api";
import { ILikedCounter } from "../types/types";

export const useLikedCount = () => {
    const [likedCount, setLikedCount] = useState(0)
    const location = useLocation();

    useEffect(() => {
        const fetchLikedCount = async () => {
            if (location.pathname === '/liked') {
              try {
                const { data } = await instance.get<ILikedCounter>('/liked');
                setLikedCount(data.movies.length)
                console.log(data);
                

              } catch (error) {
                console.error("Error fetching liked count:", error);
              }
            }
          };
      
          fetchLikedCount();
      
          return () => {};
    }, [location])

    return likedCount
}