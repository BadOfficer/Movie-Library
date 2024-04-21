import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    readonly first_name?: string;

    @IsNotEmpty()
    readonly last_name?: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email?: string;
    
    @MinLength(6)
    @IsNotEmpty()
    readonly password?: string;
}