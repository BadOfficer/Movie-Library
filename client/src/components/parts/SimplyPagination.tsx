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
        <div className="flex  flex-1 flex-col">
            <div className="flex flex-wrap mt-12 flex-1 gap-12">
                {currentItems && currentItems.map((movie) => (
                    <Movie key={movie.id} id={movie.id} title={movie.title} image={`http://localhost:3000/${movie.images[0]}`} rating={movie.rating} year={movie.release} />
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
                className="flex gap-9 items-center text-white/75 mb-9 justify-center"
            />
        </div>
    )
}

export default SimplyPagination;