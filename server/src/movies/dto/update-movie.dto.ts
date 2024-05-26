import { IsNotEmpty, IsString } from "class-validator";

export class UpdateMovieDto {
    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsNotEmpty()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsString()
    release?: string;

    @IsNotEmpty()
    @IsString()
    seasons?: string;

    @IsNotEmpty()
    @IsString()
    series?: string;

    @IsNotEmpty()
    @IsString()
    duration?: string;

    @IsNotEmpty()
    @IsString()
    rating?: string;

    @IsNotEmpty()
    @IsString()
    genres?: string;
}