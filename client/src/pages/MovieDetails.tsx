import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMovieByIDQuery } from "../services/movies.service";

const MovieDetails: FC = () => {

    const { id } = useParams();
    // const {data: movie, isLoading, isError} = useGetMovieByIDQuery(id as string)

    const [activeImage, setActiveImage] = useState("../test/img_1.jpg");
    
    const images = ["../test/img_1.jpg", "../test/img_2.jpg", "../test/img_3.jpg", "../test/img_4.jpg"];

    return <div className="flex">
        <div className="w-96">
            <img src={activeImage} alt={activeImage} />
        </div>
        <div>
            
        </div>
    </div>
}

export default MovieDetails;