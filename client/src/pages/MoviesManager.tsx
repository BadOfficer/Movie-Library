import { FC, useState } from "react"
import Header from "../components/parts/Header";
import MovieModal from "../components/movies/MovieModal";

const MoviesManager: FC = () => {
    const [showModal, setShowModal] = useState(false);

    return <div className="w-full">
        <Header currentPage="Movies" showSearchBox={true} />
        <div className="relatrive mt-12 flex-1 flex flex-col">
            <div className="w-full bg-light-gray py-2.5 px-6 flex justify-between items-center rounded-xl">
                <h3 className="text-xl">Actions: </h3>
                <div>
                    {/* <GenreButton handleClick={() => setShowModal(true)}>Add movie</GenreButton> */}
                </div>
            </div>
            <h2 className="mt-12 text-2xl text-center uppercase font-semibold">Movies list</h2>
            <div className="flex justify-center flex-1">
                <ul className="grid mt-9 gap-14 grid-cols-6 grid-flow-row">
                    <li>
                        {/* <Movie /> */}
                    </li>
                </ul>
            </div>
        </div>
        {showModal && <MovieModal type="post"/>}
    </div>
}

export default MoviesManager;