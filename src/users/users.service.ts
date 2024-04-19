import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt"
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) 
        private usersRepository: typeof User
    ) {}

    async findOne(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({where: {email}});
    }

    async create(creatUserDto: CreateUserDto): Promise<User | {warningMessage: string}> {
        const user = new User();

        const existUser = await this.findOne(creatUserDto.email);

        if(existUser) {
            return {warningMessage: "User with this email is exist!"};
        }

        const hashedPassword = await bcrypt.hash(creatUserDto.password, 10);

        user.first_name = creatUserDto.first_name;
        user.last_name = creatUserDto.last_name;
        user.email = creatUserDto.email;
        user.password = hashedPassword;

        return user.save();
    }
}
