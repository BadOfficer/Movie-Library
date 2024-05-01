import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    readonly first_name: string;

    @IsNotEmpty()
    readonly last_name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
    @IsString()
    @MinLength(6, {message: "Password must be more than 6 symbols"})
    @IsNotEmpty()
    readonly password: string;
}