import { FC } from "react";
import GenreFilterButton from "./GenreFilterButton"
import { IGenre } from "../../types/types";

interface Props {
    genres: IGenre[] | undefined
    handleIdsGenres?: (id: number) => void;
}

const MoviesNavigation: FC<Props> = ({ genres, handleIdsGenres }) => {
    
    return <div>
        {/* <GenreFilterButton title="All" moviesAmount={0} id={1} /> */}
        <ul className="flex relative gap-6">
            {genres?.map(genre => (
                <li key={genre.id}>
                    <GenreFilterButton title={genre.title} id={genre.id} moviesAmount={genre.movies.length} setGenreId={() => {}}/>
                </li>
            ))}
        </ul>
    </div>
}

export default MoviesNavigation;