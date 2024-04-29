import { Genre } from "src/genres/models/genre.model";

export class CreateMovieDto {
    title: string;
    description: string;
    images: string;
    release: string;
    seasons: number;
    series: number;
    duration: string;
    rating: string;
    genres: number[];
}