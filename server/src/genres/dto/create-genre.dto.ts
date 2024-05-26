import { IsNotEmpty, IsString } from "class-validator"

export class CreateGenreDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string 
}