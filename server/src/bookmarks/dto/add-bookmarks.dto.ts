import { IsNumber } from "class-validator";

export class AddBookmarksDto {
    @IsNumber()
    movieId: number;
}