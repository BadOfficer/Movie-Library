import { IsEmail, IsString, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsString()
    first_name?: string;

    @IsString()
    last_name?: string;

    @IsEmail()
    email?: string;

    password?: string;

    oldPassword: string
}