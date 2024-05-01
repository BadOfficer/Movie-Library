import { IsEmail, MinLength } from "class-validator";

export class UpdateUserDto {

    first_name: string;

    last_name: string;

    @IsEmail()
    email: string;
    
    @MinLength(6, {message: "Password must be more than 6 symbols"})
    password?: string;
}