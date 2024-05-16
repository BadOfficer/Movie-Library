import { useState } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart, FaStar } from "react-icons/fa";

const Movie = () => {
    const [likedState, setLikedState] = useState<boolean>(false);
    const [bookmarksState, setBookmarksState] = useState<boolean>(false);

    const handleChangeLiked = () => {
        setLikedState(state => !state);
    }

    const handleChangeBookmarks = () => {
        setBookmarksState(state => !state);
    }

    return <div className="flex flex-col gap-2.5 max-w-48 text-lg relative group cursor-pointer">
        <div className="overflow-hidden max-h-64 rounded-xl">
            <img src="movie1.png" alt="movie1" />
        </div>
        <h2 className="capitalize">flight</h2>
        <div className="flex gap-2.5">
            <div className="flex gap-2.5 items-center">
                <FaStar className="text-light-yellow"/>
                <span>7.8</span>
            </div>
            <span>|</span>
            <div>
                <span>2021</span>
            </div>
        </div>
        <div className="absolute p-2.5 bg-dark-gray/75 gap-2.5 top-1 right-1 rounded-full hidden group-hover:flex">
            <button onClick={handleChangeLiked}>
                {likedState ? <FaHeart size={14} className="text-dark-yellow"/> : <FaRegHeart size={14}/>}
            </button>
            <div className="w-0.5 h-4 bg-dark-yellow rounded-full"></div>
            <button onClick={handleChangeBookmarks}>
                {bookmarksState ? <FaBookmark size={14} className="text-dark-yellow"/> : <FaRegBookmark size={14}/>}
            </button>
        </div>
    </div>
}

export default Movie;