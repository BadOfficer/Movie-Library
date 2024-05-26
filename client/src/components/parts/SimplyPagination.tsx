import { FC, useState } from "react";
import { IMovie } from "../../types/types";
import ReactPaginate from "react-paginate";
import Movie from "../movies/Movie";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ArrowButton from "../buttons/ArrowButton";

interface Props {
    movies: IMovie[];
    itemsPerPage: number;
}

const SimplyPagination: FC<Props> = ({movies, itemsPerPage}) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = movies.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(movies.length / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % movies.length;
        setItemOffset(newOffset);
      };

    return (
        <div className="flex  flex-1 flex-col gap-12">
            <div className="flex flex-wrap mt-12 flex-1 gap-12 justify-center lg:justify-start">
                {currentItems && currentItems.map((movie) => (
                    <Movie key={movie.id} passedMovie={movie} />
                ))}
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
                className="flex gap-9 items-center text-white/75 mb-3 lg:mb-9 justify-center"
            />
        </div>
    )
}

export default SimplyPagination;