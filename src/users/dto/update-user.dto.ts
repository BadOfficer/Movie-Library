import { IsEmail, MinLength } from "class-validator";

export class UpdateUserDto {

    readonly first_name: string;

    readonly last_name: string;

    @IsEmail()
    readonly email: string;
    
    @MinLength(6, {message: "Password must be more than 6 symbols"})
    readonly password: string;
}