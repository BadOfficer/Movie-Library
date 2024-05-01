import { IsNotEmpty, IsString } from "class-validator"

export class UpdateGenreDto{
    @IsString()
    @IsNotEmpty()
    title?: string

    @IsString()
    @IsNotEmpty()
    description?: string 
}