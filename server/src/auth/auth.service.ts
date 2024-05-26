import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { UserIf } from '../users/models/user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

    async registerAccount(createUserDto: CreateUserDto): Promise<UserIf | {warningMessage: string}>{
        return await this.usersService.createUser(createUserDto);
    }

    async validateUser(email: string, password: string) {
        const existingUser = await this.usersService.findOne({where: {email}})

        if(!existingUser) {
            throw new UnauthorizedException("Invalid Credentials!");
        }

        const validatedPassword = await bcrypt.compare(password, existingUser.password);

        if(!validatedPassword) {
            throw new UnauthorizedException("Invalid Credentials!");
        }

        if(existingUser && validatedPassword) {
            return {
                id: existingUser.id,
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                email: existingUser.email,
                role: existingUser.role
            }
        }
    }

    async login(user: UserIf): Promise<{user: UserIf, access_token: string}> {
       const validatedUser = await this.validateUser(user.email, user.password);

       return {
            user: validatedUser,
            access_token: await this.jwtService.signAsync({ user: validatedUser })
       }
    }
}
