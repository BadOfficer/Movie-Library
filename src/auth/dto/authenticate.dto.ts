import { IsNotEmpty, IsString } from "class-validator";

export class AuthenticateDto {
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}