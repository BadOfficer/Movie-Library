import { IsNumber, IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    images: string[];

    @IsString()
    release: string;

    @IsString()
    seasons: string;

    @IsString()
    series: string;

    @IsString()
    duration: string;

    @IsString()
    rating: string;

    @IsString()
    genres: string;
}