import { IsNotEmpty, IsString } from "class-validator";

export class AddToLikedDto {
    @IsString()
    @IsNotEmpty()
    readonly movieId: string;
}