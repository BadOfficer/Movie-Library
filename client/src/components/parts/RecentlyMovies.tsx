import { FC, useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";
import ArrowButton from "../buttons/ArrowButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { IMovie } from "../../types/types";
import Loader from "./Loader";
import Movie from "../movies/Movie";

interface Props {
    sectionTitle: string;
    loading: boolean;
    movies: IMovie[];
}

const RecentlyMovies: FC<Props> = ({sectionTitle, loading, movies}) => {

    const [offset, setOffset] = useState(0);
    const [moviesPerPage, setMoviesPerPage] = useState(6);

    const handlePrev = () => {
        if (offset > 0) {
            setOffset(offset - 1);
        }
    };

    const handleNext = () => {
        if (offset + moviesPerPage < movies.length) {
            setOffset(offset + 1);
        }
    };

    useEffect(() => {
        const updateMoviesPerPage = () => {
            const width = window.innerWidth;
            if (width >= 1536) {
                setMoviesPerPage(6);
            } else if (width >= 1280) {
                setMoviesPerPage(4);
            } else if (width >= 1024) {
                setMoviesPerPage(3);
            } else if (width >= 768) {
                setMoviesPerPage(3);
            } else if (width >= 640) {
                setMoviesPerPage(2);
            } else {
                setMoviesPerPage(1);
            }
        };

        window.addEventListener("resize", updateMoviesPerPage);
        updateMoviesPerPage();

        return () => window.removeEventListener("resize", updateMoviesPerPage);
    }, []);

    const currentMovies = movies.slice(offset, offset + moviesPerPage);

    return <div className="flex flex-col gap-9 px-3 lg:px-0">
                <div className="flex justify-start gap-9">
                    <SectionTitle>{sectionTitle}</SectionTitle>
                    <div className="flex gap-5">
                        <ArrowButton handleClick={handlePrev}>
                            <MdKeyboardArrowLeft size={20}/>
                        </ArrowButton>
                        <ArrowButton handleClick={handleNext}>
                            <MdKeyboardArrowRight size={20}/>
                        </ArrowButton>
                    </div>
                </div>
                <div className="flex justify-center overflow-hidden">
                    {loading && <Loader />}
                    {movies && movies.length !== 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 2xl:gap-12">
                        {currentMovies.map(film => (
                            <Movie
                                id={film.id}
                                image={`http://localhost:3000/${film.images[1]}`}
                                rating={film.rating}
                                title={film.title}
                                year={film.release}
                                key={film.id}
                            />
                        ))}
                    </div>
                    )}
                     {movies.length === 0 && <p className="m-12">Movies not found!</p>}
                </div>
            </div>
}

export default RecentlyMovies;