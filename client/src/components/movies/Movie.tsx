import { FC } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { useAddToLikedMutation, useGetLikedQuery, useRemoveFromLikedMutation } from "../../services/liked.service";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useAddToBookmarksMutation, useGetBookmarksQuery, useRemoveFromBookmarksMutation } from "../../services/bookmarks.service";
import Rating from "../parts/Rating";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { IMovie } from "../../types/types";
import { useDeleteMovieMutation } from "../../services/movies.service";
import { toast } from "react-toastify";
import { useLazyGetGenresQuery } from "../../services/genres.service";

interface Props {
    passedMovie: IMovie;
    isAdmin?: boolean;
    handleSetCurMovieData?: () => void;
}

const Movie: FC<Props> = ({ passedMovie, isAdmin = false, handleSetCurMovieData }) => {
    const isAuth = useAuth();

    const [addToLiked, {}] = useAddToLikedMutation();
    const [addToBookmarks, {}] = useAddToBookmarksMutation();
    const [removeFromLiked, {}] = useRemoveFromLikedMutation();
    const [removeFromBookmarks, {}] = useRemoveFromBookmarksMutation();
    const [deleteMovie, {}] = useDeleteMovieMutation();
    const [triggerGetGenres] = useLazyGetGenresQuery();

    const {data: likedList} = useGetLikedQuery('', { skip: !isAuth });
    const {data: bookmarksList} = useGetBookmarksQuery('', { skip: !isAuth});

    let isLiked = false;
    let isBookmarked = false;

    if(likedList) {
        isLiked = likedList?.movies.some(movie => movie.id === passedMovie.id);
    }

    if(bookmarksList) {
        isBookmarked = bookmarksList?.movies.some(movie => movie.id === passedMovie.id);
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

    const handleEditMovie = (e: React.MouseEvent<HTMLButtonElement>) => {
        handleReset(e);
        handleSetCurMovieData?.();
    }

    const handleDeleteMovie = async(e: any) => {
        e.preventDefault();
        const {error} = await deleteMovie(passedMovie.id)
        if(error) {
            if ('data' in error) {
                const errorData = error.data as { message: string[] | string };
                
                if (Array.isArray(errorData.message)) {
                    errorData.message.forEach(msg => toast.error(msg));
                } else {
                    toast.error(errorData.message);
                }
            }
        }
        triggerGetGenres("");
        toast.success(`${passedMovie.title} has been deleted!`)
    }

    return <Link to={`/movie-details/${passedMovie.id}`} className="flex flex-col gap-2.5 max-w-48 text-lg relative group cursor-pointer">
                <div className="overflow-hidden max-h-64 rounded-xl">
                    <img src={`http://localhost:3000/${passedMovie.images[1]}`} alt={passedMovie.images[1]} />
                </div>
                <h2 className="capitalize">{passedMovie.title}</h2>
                <div className="flex gap-2.5">
                    <Rating rating={passedMovie.rating} />
                    <span>|</span>
                    <div>
                        <span>{passedMovie.release}</span>
                    </div>
                </div>
                {isAuth && (
                    <div className="absolute p-2.5 bg-dark-gray/75 gap-2.5 top-1 right-1 rounded-full flex lg:group-hover:flex lg:hidden">
                        <>
                            {isLiked ? (
                                <button onClick={(e) => handleRemoveFromLiked(passedMovie.id, e)}>
                                    <FaHeart size={14} className="text-dark-yellow"/>
                                </button>
                            ) : (
                                <button onClick={(e) => handleAddToLiked(passedMovie.id, e)}>
                                    <FaRegHeart size={14}/>
                                </button>
                            )}
                        </>
                        <div className="w-0.5 h-4 bg-dark-yellow rounded-full"></div>
                        <>
                            {isBookmarked ? (
                                <button onClick={(e) => handleRemoveFromBookmarks(passedMovie.id, e)}>
                                    <FaBookmark size={14} className="text-dark-yellow"/>
                                </button>
                            ) : (
                                <button onClick={(e) => handleAddToBookmarks(passedMovie.id, e)}>
                                    <FaRegBookmark size={14}/>
                                </button>
                            )}
                        </>
                    </div>
                )}
                {isAdmin && (
                    <div className="absolute">
                        <div className="absolute p-2.5 bg-dark-gray/75 gap-2.5 top-1 left-1 rounded-full flex lg:group-hover:flex lg:hidden">
                            <button onClick={handleEditMovie}>
                                <MdOutlineModeEdit size={16}/>
                            </button>
                        <div className="w-0.5 h-4 bg-dark-yellow rounded-full"></div>
                            <button onClick={(e) => handleDeleteMovie(e)}>
                                <MdDeleteOutline size={16} />
                            </button>
                        </div>
                    </div>
                )}
                    
            </Link>
}

export default Movie;