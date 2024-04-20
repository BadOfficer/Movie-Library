import { IsNotEmpty } from "class-validator"

export class UpdateGenreDto{
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string 
}