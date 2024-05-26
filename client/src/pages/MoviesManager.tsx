import { FC, useState } from "react"
import Header from "../components/parts/Header";
import MovieModal from "../components/movies/MovieModal";
import SolidButton from "../components/buttons/SolidButton";
import { useGetAllMoviesQuery } from "../services/movies.service";
import Loader from "../components/parts/Loader";
import IsEmpty from "../components/parts/IsEmpty";
import PaginatedMovies from "../components/movies/PaginatedMovies";
import useSearchPagination from "../hooks/useSearchPagination";
import { IMovieModal } from "../types/types";
import Footer from "../components/parts/Footer";

const MoviesManager: FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    
    const [curMovie, setCurMovie] = useState<IMovieModal>({
        id: "",
        title: "",
        description: "",
        release: "",
        seasons: "",
        series: "",
        duration: "",
        rating: "",
        genres: ""
    });

    const { searchData, offset, handleSearch, handleNewOffset } = useSearchPagination();
    const count = 18;

    const {isLoading, isError, data: allMoviesResponse} = useGetAllMoviesQuery(`${searchData},${count},${offset}`);
    const allMovies = allMoviesResponse?.rows;

    const handleShowUpdateModal = (movie: IMovieModal) => {
        setIsEdit(true);
        setShowModal(true);
        setCurMovie(movie);
    }


    return <>
        {showModal && <MovieModal type="post" setVisible={setShowModal} movie={curMovie}/>}
        {showModal && isEdit && <MovieModal type="patch" setVisible={setShowModal} movie={curMovie} handleSetEdit={setIsEdit}/>}
        <div className="w-full flex flex-col flex-1">
        <Header currentPage="Movies" showSearchBox={true} handleClick={handleSearch}/>
        <div className="relatrive mt-12 flex-1 flex flex-col mx-2.5 lg:mx-2.5">
            <div className="w-full bg-light-gray py-2.5 px-6 flex justify-between items-center rounded-xl">
                <h3 className="text-xl">Actions: </h3>
                <div className="gap-6 flex">
                    <SolidButton handleClick={() => setShowModal(true)} >Add movie</SolidButton>
                </div>
            </div>
            <h2 className="mt-12 text-2xl text-center uppercase font-semibold mb-9">Movies list</h2>
            {isLoading && (
                <div className="flex items-center justify-center flex-1">
                    <Loader />
                </div>
            )}
            {isError && (<p>Something went wrong!!!</p>)}
            {allMovies?.length === 0 ? (
                <div className="flex items-center justify-center flex-1">
                    <IsEmpty text="It seems that no movies was found!" />
                </div>
            ) : (
                <div className="flex flex-1 flex-col items-center gap-12">
                    <PaginatedMovies movies={allMovies || []} itemsPerPage={count} countMovies={allMoviesResponse?.count || 0} handleNewOffset={handleNewOffset} isAdmin={true} handleSetCurMovie={handleShowUpdateModal}/>
                </div>
            )}
        </div>
        <Footer />
    </div>
    </>
}

export default MoviesManager;