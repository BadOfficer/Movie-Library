import { IsNumber } from "class-validator";

export class RemoveLikedDto {
    @IsNumber()
    movieId: number;
}