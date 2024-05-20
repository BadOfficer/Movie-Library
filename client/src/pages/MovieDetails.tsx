import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetMovieByIDQuery } from "../services/movies.service";

const MovieDetails: FC = () => {

    const { id } = useParams();
    const {data: movie, isLoading, isError} = useGetMovieByIDQuery(id as string)

    if(movie) {
        console.log(movie);
    }
    

    return <div>
        {id}
    </div>
}

export default MovieDetails;