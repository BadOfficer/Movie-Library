import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    readonly first_name?: string;

    @IsNotEmpty()
    readonly last_name?: string;

    @IsNotEmpty()
    readonly email?: string;
    
    @IsNotEmpty()
    readonly password?: string;
}