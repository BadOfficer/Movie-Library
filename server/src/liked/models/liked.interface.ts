import { MovieIf } from "src/movies/models/movie.interface";

export interface LikedIf {
    userId: number,
    movies: MovieIf[]
}