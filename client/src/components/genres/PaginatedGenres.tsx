import { FC } from "react";
import { IGenre } from "../../types/types";
import Genre from "./Genre";
import ReactPaginate from "react-paginate";
import ArrowButton from "../buttons/ArrowButton";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface Props {
    genres: IGenre[] | undefined;
    handleClick: (id: number, title: string, description: string) => void;
    handleDelete: (id: number, e: any) => void;
    handleSetNewOffset: (offsetValue: number) => void;
    countGenres: number;
    itemsPerPage: number
}

const PaginatedGenres: FC<Props> = ({genres, handleClick, handleDelete, handleSetNewOffset, countGenres, itemsPerPage}) => {

    const pageCount = Math.ceil(countGenres / itemsPerPage);
   
    const handlePageClick = (event: any) => {
        const newOffset = event.selected;
    
        handleSetNewOffset(newOffset);
    };
    return (
        <>
            <div className="flex items-start justify-center flex-1">
                <ul className="flex flex-wrap mt-9 gap-9 justify-center lg:justify-start">
                {genres?.map((genre, index) => (
                    <li key={index} className="block">
                        <Genre title={genre.title} amount={genre.movies.length} id={genre.id} handleClick={() => handleClick(genre.id, genre.title, genre.description)} handleDelete={handleDelete}/>
                    </li>
                ))}
                </ul>
            </div>
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
            className="flex gap-9 items-center justify-center text-white/75 mb-3 mt-3 lg:mb-9"
    />
        </>
    )
}

export default PaginatedGenres;