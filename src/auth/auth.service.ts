import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { UserIf } from './models/user.interface';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User) private userRepository: typeof User, private jwtService: JwtService) {}

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12); 
    }

    async findOne(filter: {where: {id?: string, first_name?: string, last_name?: string, email?: string}}): Promise<UserIf> {
        return this.userRepository.findOne({...filter})
    }

    async registerAccount(createUserDto: CreateUserDto): Promise<UserIf | {warningMessage: string}>{
        const user = new User();
        const existingUser = await this.findOne({where: {email: createUserDto.email}});

        if(existingUser) {
            return {warningMessage: "User with this email is exist!"}; 
        }
        const hashedPassword = await this.hashPassword(createUserDto.password);

        user.first_name = createUserDto.first_name;
        user.last_name = createUserDto.last_name;
        user.email = createUserDto.email;
        user.password = hashedPassword;

        await user.save()

        const {first_name, last_name, email, password, role} = user

        return {first_name, last_name, email, role};
    }

    async validateUser(email: string, password: string) {
        const existingUser = await this.userRepository.findOne({where: {email}})

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

    async login(user: UserIf): Promise<{access_token: string}> {
       const validatedUser = await this.validateUser(user.email, user.password);

       return {
            access_token: await this.jwtService.signAsync({ user: validatedUser })
       }
    }
}
