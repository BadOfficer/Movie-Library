import { IsNotEmpty } from "class-validator"

export class CreateGenreDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string 
}