import { FC } from "react";
import { IMovie } from "../../types/types";
import Movie from "./Movie";
import ReactPaginate from "react-paginate";
import ArrowButton from "../buttons/ArrowButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface Props {
    itemsPerPage: number;
    movies: IMovie[];
    handleNewOffset: (offset: number) => void;
    countMovies: number
}

const PaginatedMovies: FC<Props> = ({ itemsPerPage, movies, handleNewOffset, countMovies }) => {
    const pageCount = Math.ceil(countMovies / itemsPerPage);
   
    const handlePageClick = (event: any) => {
        const newOffset = event.selected;
    
        handleNewOffset(newOffset);
    };

    return <>
        <ul className="flex flex-wrap gap-12 flex-1 justify-center lg:justify-start w-full">
            {movies?.map(movie => (
                <li key={movie.id}>
                    <Movie title={movie.title} image={`http://localhost:3000/${movie.images[1]}`} rating={movie.rating} year={movie.release} id={movie.id}/>
                </li>
            ))}
        </ul>
        <ReactPaginate
            breakLabel="..."
            previousLabel={(<ArrowButton>
                <MdKeyboardArrowLeft size={20}/>
            </ArrowButton>)}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            nextLabel={(<ArrowButton>
                <MdKeyboardArrowRight size={20}/>
            </ArrowButton>)}
            renderOnZeroPageCount={null}
            activeClassName="text-white"
            className="flex gap-9 items-center text-white/75 mb-3 lg:mb-9"
        />
    </>
}

export default PaginatedMovies;