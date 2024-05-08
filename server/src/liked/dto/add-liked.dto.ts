import { IsNumber } from "class-validator";

export class AddLikedDto {
    @IsNumber()
    movieId: number;
}