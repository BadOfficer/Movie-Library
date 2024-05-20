import { FC } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart, FaStar } from "react-icons/fa";
import { useAddToLikedMutation, useGetLikedQuery, useRemoveFromLikedMutation } from "../../services/liked.service";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useAddToBookmarksMutation, useGetBookmarksQuery, useRemoveFromBookmarksMutation } from "../../services/bookmarks.service";

interface Props {
    id: number;
    image: string;
    title: string;
    rating: string;
    year: string;
}

const Movie: FC<Props> = ({ image, title, rating, year, id }) => {
    const isAuth = useAuth();

    const [addToLiked, {}] = useAddToLikedMutation();
    const [addToBookmarks, {}] = useAddToBookmarksMutation();
    const [removeFromLiked, {}] = useRemoveFromLikedMutation();
    const [removeFromBookmarks, {}] = useRemoveFromBookmarksMutation();

    const {data: likedList} = useGetLikedQuery('', { skip: !isAuth });
    const {data: bookmarksList} = useGetBookmarksQuery('', { skip: !isAuth});

    let isLiked = false;
    let isBookmarked = false;

    if(likedList) {
        isLiked = likedList?.movies.some(movie => movie.id === id);
    }

    if(bookmarksList) {
        isBookmarked = bookmarksList?.movies.some(movie => movie.id === id);
    }

    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }


    const handleAddToLiked = async(movieId: number, e: React.MouseEvent<HTMLButtonElement>) => {
        handleReset(e);
        
        const movie = {
            movieId: movieId
        }

        await addToLiked(movie);
    }

    const handleRemoveFromLiked = async(movieId: number, e: React.MouseEvent<HTMLButtonElement>) => {
        handleReset(e);
        
        const movie = {
            movieId: movieId
        }

        await removeFromLiked(movie);
    }

    const handleAddToBookmarks = async(movieId: number, e: React.MouseEvent<HTMLButtonElement>) => {
        handleReset(e);
        
        const movie = {
            movieId: movieId
        }

        await addToBookmarks(movie);
    }

    const handleRemoveFromBookmarks = async(movieId: number, e: React.MouseEvent<HTMLButtonElement>) => {
        handleReset(e);
        
        const movie = {
            movieId: movieId
        }

        await removeFromBookmarks(movie);
    }

    return <Link to={`/movie-details/${id}`} className="flex flex-col gap-2.5 max-w-48 text-lg relative group cursor-pointer">
                <div className="overflow-hidden max-h-64 rounded-xl">
                    <img src={image} alt={image} />
                </div>
                <h2 className="capitalize">{title}</h2>
                <div className="flex gap-2.5">
                    <div className="flex gap-2.5 items-center">
                        <FaStar className="text-light-yellow"/>
                        <span>{rating}</span>
                    </div>
                    <span>|</span>
                    <div>
                        <span>{year}</span>
                    </div>
                </div>
                {isAuth && (
                            <div className="absolute p-2.5 bg-dark-gray/75 gap-2.5 top-1 right-1 rounded-full hidden group-hover:flex">
                                <>
                                    {isLiked ? (
                                        <button onClick={(e) => handleRemoveFromLiked(id, e)}>
                                            <FaHeart size={14} className="text-dark-yellow"/>
                                        </button>
                                    ) : (
                                        <button onClick={(e) => handleAddToLiked(id, e)}>
                                            <FaRegHeart size={14}/>
                                        </button>
                                    )}
                                </>
                                <div className="w-0.5 h-4 bg-dark-yellow rounded-full"></div>
                                <>
                                    {isBookmarked ? (
                                        <button onClick={(e) => handleRemoveFromBookmarks(id, e)}>
                                            <FaBookmark size={14} className="text-dark-yellow"/>
                                        </button>
                                    ) : (
                                        <button onClick={(e) => handleAddToBookmarks(id, e)}>
                                            <FaRegBookmark size={14}/>
                                        </button>
                                    )}
                                </>
                            </div>
                        )}
            </Link>
}

export default Movie;