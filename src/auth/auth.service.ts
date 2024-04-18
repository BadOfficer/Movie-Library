import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);

        if(!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const passwordValid = await bcrypt.compare(password, user.password);

        if(!passwordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }
        
        if(user && passwordValid) {
            return user;
        }
    }

    async login(user: IUser) {
        const {id, email} = user;
        return {
            id, 
            email, 
            token: this.jwtService.sign({id: user.id, email: user.email}),
        }
    }
}
