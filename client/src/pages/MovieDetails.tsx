import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetMovieByTitleQuery } from "../services/movies.service";

const MovieDetails: FC = () => {

    const { title } = useParams();
    const {data: movie, isLoading, isError} = useGetMovieByTitleQuery(title as string)

    if(movie) {
        console.log(movie);
    }
    

    return <div>
        {title}
    </div>
}

export default MovieDetails;