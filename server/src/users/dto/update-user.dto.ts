import { IsEmail, IsString, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsString()
    first_name?: string;

    @IsString()
    last_name?: string;

    @IsEmail()
    email?: string;
    
    @IsString()
    @MinLength(6, {message: "Password must be more than 6 symbols"})
    password?: string;
}