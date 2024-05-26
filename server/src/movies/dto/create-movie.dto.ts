import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    release: string;

    @IsString()
    @IsNotEmpty()
    seasons: string;

    @IsString()
    @IsNotEmpty()
    series: string;

    @IsString()
    @IsNotEmpty()
    duration: string;

    @IsString()
    @IsNotEmpty()
    rating: string;

    @IsString()
    @IsNotEmpty()
    genres: string;
}