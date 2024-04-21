import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { AuthenticateDto } from './dto/authenticate.dto';
import { use } from 'passport';
import {sign} from "jsonwebtoken"

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private readonly jwtService: JwtService) {}

    async validateUser(authenticateDto: AuthenticateDto) {
        
        const user = await this.usersService.findOne(authenticateDto.email);

        if(!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const passwordValid = await bcrypt.compare(authenticateDto.password, user.password);

        if(!passwordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const  token = sign({...user}, "fjmbokgfbnlkufdghbnlkufdhbgnku");
        
        return token;
    }
}
