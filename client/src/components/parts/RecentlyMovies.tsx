import { FC, useState } from "react";
import SectionTitle from "./SectionTitle";
import ArrowButton from "../buttons/ArrowButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IMovie } from "../../types/types";
import Loader from "./Loader";
import Movie from "../movies/Movie";
import IsEmpty from "./IsEmpty";

interface Props {
    sectionTitle: string;
    loading: boolean;
    movies: IMovie[];
}

const RecentlyMovies: FC<Props> = ({sectionTitle, loading, movies}) => {

    const [offset, setOffset] = useState(0);
    const itemsPerPage = 6;

    const handleNextMovie = () => {
        setOffset((state) => (state + 1 >= movies.length ? 0 : state + 1));
    };

    const handlePrevMovie = () => {
        setOffset((state) => (state - 1 < 0 ? movies.length - 1 : state - 1));
    };

    const showedMovies = movies.slice(offset, offset + itemsPerPage);

    if (showedMovies.length < itemsPerPage) {
        showedMovies.push(...movies.slice(0, itemsPerPage - showedMovies.length));
    }

    return <div className="flex flex-col gap-9">
                <div className="flex justify-start gap-9">
                    <SectionTitle>{sectionTitle}</SectionTitle>
                    <div className="flex gap-5">
                        <ArrowButton handleClick={handlePrevMovie}>
                            <MdKeyboardArrowLeft size={20}/>
                        </ArrowButton>
                        <ArrowButton handleClick={handleNextMovie}>
                            <MdKeyboardArrowRight size={20}/>
                        </ArrowButton>
                    </div>
                </div>
                <div className="flex justify-center">
                    {loading && (
                        <Loader />
                    )}
                    {movies && movies.length !== 0 && (
                        <div className="flex gap-12">
                            {showedMovies.map(film => (
                                <Movie id={film.id} image={`http://localhost:3000/${film.images[0]}`} rating={film.rating} title={film.title} year={film.release} key={film.id} />
                            ))}
                        </div>
                    )}
                     {movies.length === 0 && (
                        <p className="m-12">Movies not found!</p>
                     )}
                </div>
            </div>
}

export default RecentlyMovies;