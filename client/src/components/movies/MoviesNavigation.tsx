import { FC } from "react";
import GenreFilterButton from "./GenreFilterButton"
import { IGenre } from "../../types/types";

interface Props {
    genres: IGenre[] | undefined
    handleIdsGenres: (id: number) => void;
}

const MoviesNavigation: FC<Props> = ({ genres, handleIdsGenres }) => {
    
    return <div>
        {genres?.length !== 0 && (
            <ul className="flex relative gap-6 mt-12 overflow-auto">
                {genres?.map(genre => (
                    <li key={genre.id}>
                        <GenreFilterButton title={genre.title} id={genre.id} moviesAmount={genre.movies.length} setGenreId={handleIdsGenres}/>
                    </li>
                ))}
            </ul>
        )}
    </div>
}

export default MoviesNavigation;