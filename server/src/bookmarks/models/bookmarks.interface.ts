import { MovieIf } from "src/movies/models/movie.interface";

export interface BookmarksIf {
    userId: number;
    movies: MovieIf[]
}