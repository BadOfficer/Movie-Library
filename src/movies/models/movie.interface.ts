import { Genre } from "src/genres/models/genre.model";

export interface MovieIf {
    id?: number;
    title?: string;
    description?: string;
    images?: string[];
    release?: string;
    seasons?: number;
    series?: number;
    duration?: string;
    rating?: string;
    genres?: Genre[];
}