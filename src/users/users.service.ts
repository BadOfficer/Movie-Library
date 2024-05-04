import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from "bcrypt";
import { UserIf } from './models/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LikedService } from 'src/liked/liked.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User,
                                    private likedService: LikedService) {}

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12); 
    }

    async findOne(filter: {where: {id?: number, first_name?: string, last_name?: string, email?: string}}): Promise<UserIf> {
        return this.usersRepository.findOne({...filter})
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserIf | {warningMessage: string}> {
        const user = new User();
        const existingUser = await this.usersRepository.findOne({where: {email: createUserDto.email}});

        if(existingUser) {
            return {warningMessage: "User with this email is exist!"}; 
        }
        const hashedPassword = await this.hashPassword(createUserDto.password);

        user.first_name = createUserDto.first_name;
        user.last_name = createUserDto.last_name;
        user.email = createUserDto.email;
        user.password = hashedPassword;

        await user.save()

        const {id, first_name, last_name, email, password, role} = user
        await this.likedService.create(id);

        return {id, first_name, last_name, email, role};
    }

    async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<UserIf> {
        const existUser = await this.usersRepository.findOne({ where: { id } });
    
        if (!existUser) {
            throw new NotFoundException("User not found!");
        }
    
        if (updateUserDto.email && updateUserDto.email !== existUser.email) {
            const existEmail = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });
    
            if (existEmail) {
                throw new BadRequestException("This email is already in use!");
            }
        }

        if (updateUserDto.password) {
            const hashedPassword = await this.hashPassword(updateUserDto.password);
            updateUserDto.password = hashedPassword;
        }
    
        Object.assign(existUser, updateUserDto);
    
        return await existUser.save();
    }
    

    async deleteUser(userId: number): Promise<string> {
        const existUser = await this.usersRepository.findOne({where: {id: userId}});

        if(!existUser) {
            throw new NotFoundException("User not found!");
        }
        await existUser.destroy();

        return "Account is deleted";
    }

    async getProfile(userId: number): Promise<UserIf> {
        const existUser = await this.usersRepository.findOne({where: {id: userId}, include: {all: true}});

        if(!existUser) {
            throw new NotFoundException("User not found!");
        }

        return existUser;
    }
}
