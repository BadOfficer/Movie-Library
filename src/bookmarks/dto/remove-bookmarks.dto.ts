import { IsNumber } from "class-validator";

export class RemoveBookmarksDto {
    @IsNumber()
    movieId: number;
}