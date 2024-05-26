import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetMovieByIDQuery } from "../services/movies.service";
import SolidButton from "../components/buttons/SolidButton";
import BorderButton from "../components/buttons/BorderButton";
import {Flat} from '@alptugidin/react-circular-progress-bar'
import Footer from "../components/parts/Footer";
import Loader from "../components/parts/Loader";
import { useAuth } from "../hooks/useAuth";
import { useAddToLikedMutation, useGetLikedQuery, useRemoveFromLikedMutation } from "../services/liked.service";
import { useAddToBookmarksMutation, useGetBookmarksQuery, useRemoveFromBookmarksMutation } from "../services/bookmarks.service";

const MovieDetails: FC = () => {

    const { id } = useParams();
    const {data: movie, isLoading} = useGetMovieByIDQuery(id as string)
    const isAuth = useAuth();

    const [addToLiked, {}] = useAddToLikedMutation();
    const [addToBookmarks, {}] = useAddToBookmarksMutation();
    const [removeFromLiked, {}] = useRemoveFromLikedMutation();
    const [removeFromBookmarks, {}] = useRemoveFromBookmarksMutation();

    const {data: likedList} = useGetLikedQuery('', { skip: !isAuth });
    const {data: bookmarksList} = useGetBookmarksQuery('', { skip: !isAuth});

    let isLiked = false;
    let isBookmarked = false;

    if(likedList && id) {
        isLiked = likedList?.movies.some(movie => movie.id === +id);
    }

    if(bookmarksList && id) {
        isBookmarked = bookmarksList?.movies.some(movie => movie.id === +id);
    }

    const handleAddToLiked = async(movieId: number) => {
        
        const movie = {
            movieId: movieId
        }

        await addToLiked(movie);
    }

    const handleRemoveFromLiked = async(movieId: number) => {
        
        const movie = {
            movieId: movieId
        }

        await removeFromLiked(movie);
    }

    const handleAddToBookmarks = async(movieId: number) => {
        
        const movie = {
            movieId: movieId
        }

        await addToBookmarks(movie);
    }

    const handleRemoveFromBookmarks = async(movieId: number) => {
        
        const movie = {
            movieId: movieId
        }

        await removeFromBookmarks(movie);
    }

    return <div className="w-full flex mt-12 flex-col flex-1">
        {isLoading && (
            <div className="flex items-center flex-1 justify-center">
                <Loader />
            </div>
        )}
        {movie && (
            <div className="flex-1">
                <div className="flex flex-col gap-20 w-full">
                    <div className="flex flex-col gap-6 items-center lg:items-start">
                        <h2 className="text-2xl tracking-widest uppercase font-medium md:text-5xl">{movie.title}</h2>
                        <div className="text-sm flex gap-6 uppercase font-medium flex-wrap justify-center md:justify-start">
                            <div>{movie.release}</div>
                            <div>run time</div>
                            <div className="lowercase text-white/75">{movie.duration} mins</div>
                            <div>Seasons</div>
                            <div className="text-white/75">{movie.seasons} {movie.seasons === 1 ? "season" : "seasons"}</div>
                            <div>series</div>
                            <div className="text-white/75">{movie.series} series</div>
                        </div>
                        {isAuth && id && (
                            <div className="flex gap-6">
                                <SolidButton handleClick={isLiked ? () => handleRemoveFromLiked(+id) : () => handleAddToLiked(+id)}>{isLiked ? "- Remove from liked" : "+ Add to liked"}</SolidButton>
                                <BorderButton handleClick={isBookmarked ? () => handleRemoveFromBookmarks(+id) : () => handleAddToBookmarks(+id)}>{isBookmarked ? "- Remove from bookmarks" : "+ Add to bookmarks"}</BorderButton>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6 flex-1 items-center lg:items-start mb-6 md:mb-0">
                        <img src={`http://localhost:3000/${movie.images[1]}`} alt={movie?.id.toString()} className="max-w-52 h-auto rounded-xl"/>
                        <div className="flex-1">
                            <div className="xl:max-w-[50%] flex flex-col gap-6 items-center lg:items-start px-12 lg:px-0">
                                <div>
                                    {movie.description}
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {movie.genres.map(genre => (
                                        <div key={genre.title} className="px-3 py-1 border-2 border-light-yellow rounded-xl">{genre.title}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="max-w-52 max-h-52 h-full w-full">
                            <Flat
                                progress={+movie.rating}
                                range={{ from: 0, to: 10 }}
                                showValue={false}
                                text={movie.rating}
                                showMiniCircle={false}
                                sign={{ value: '', position: 'end' }}
                                sx={{
                                    bgStrokeColor: '#383838',
                                    strokeColor: '#FFC812',
                                    barWidth: 5,
                                    textSize: 30,
                                    textColor: '#FAB23D',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}
        <Footer />
    </div>
}

export default MovieDetails;