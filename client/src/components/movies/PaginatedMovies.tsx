import { FC } from "react";
import { IMovie } from "../../types/types";
import Movie from "./Movie";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import ArrowButton from "../buttons/ArrowButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface Props {
    itemsPerPage: number;
    movies: IMovie[];
    offsetValue: number;
    handleNewOffset: (offset: number) => void
}

const PaginatedMovies: FC<Props> = ({ itemsPerPage, movies, offsetValue, handleNewOffset }) => {

    const endOffset = offsetValue + itemsPerPage;
    const pageCount = Math.ceil(movies.length / itemsPerPage);
   
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % movies.length;

        handleNewOffset(newOffset);
    };

    return <>
        <ul className="grid gap-12 grid-cols-6 grid-flow-row flex-1">
            {movies?.map(movie => (
                <li key={movie.id}>
                    <Movie title={movie.title} image={`http://localhost:3000/${movie.images[0]}`} rating={movie.rating} year={movie.release}/>
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
            className="flex gap-9 items-center text-white/75 mb-9"
        />
    </>
}

export default PaginatedMovies;