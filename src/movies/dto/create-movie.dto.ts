import { IsNumber, IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    images: string[];

    @IsString()
    release: string;

    @IsNumber()
    seasons: number;

    @IsNumber()
    series: number;

    @IsString()
    duration: string;

    @IsString()
    rating: string;

    genres: number[];
}