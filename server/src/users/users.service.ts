import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from "bcrypt";
import { DeleteProfileIf, GetProfileIf, UserIf } from './models/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LikedService } from 'src/liked/liked.service';
import { BookmarksService } from 'src/bookmarks/bookmarks.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User,
                                    private likedService: LikedService,
                                    private bookmarksService: BookmarksService) {}

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
           throw new BadRequestException("User with this email is exist!"); 
        }
        const hashedPassword = await this.hashPassword(createUserDto.password);

        user.first_name = createUserDto.first_name;
        user.last_name = createUserDto.last_name;
        user.email = createUserDto.email;
        user.password = hashedPassword;

        await user.save()

        const {id, first_name, last_name, email, password, role} = user
        await this.likedService.create(id);
        await this.bookmarksService.create(id);

        return {id, first_name, last_name, email, role};
    }

    async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<UserIf> {
        const existUser = await this.usersRepository.findOne({ where: { id } });
    
        if (!existUser) {
            throw new NotFoundException("User not found!");
        }
    
        if (updateUserDto.email !== existUser.email) {
            const existEmail = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });
    
            if (existEmail) {
                throw new BadRequestException("This email is already in use!");
            }
        }

        const validatePassword = await bcrypt.compare(updateUserDto.oldPassword, existUser.password);

        if(validatePassword) {
            const newPassword = updateUserDto.password === '' ? existUser.password : await this.hashPassword(updateUserDto.password)
            Object.assign(existUser, {
                first_name: updateUserDto.first_name,
                last_name: updateUserDto.last_name,
                email: updateUserDto.email,
                password: newPassword
            });
    
            return await existUser.save();
        }

        throw new BadRequestException("Incorrect password!")
    }
    

    async deleteUser(deleteUserPas: DeleteProfileIf, userId: number): Promise<string> {
        const existUser = await this.usersRepository.findOne({where: {id: userId}});

        if(!existUser) {
            throw new NotFoundException("User not found!");
        }

        const validatePassword = await bcrypt.compare(deleteUserPas.password, existUser.password);

        
        if(validatePassword) {
            await existUser.destroy();
            return "Account is deleted";
        }

        throw new BadRequestException("Incorrect password!")
    }

    async getProfile(userId: number): Promise<GetProfileIf> {
        const existUser = await this.usersRepository.findOne({where: {id: userId}});

        if(!existUser) {
            throw new NotFoundException("User not found!");
        }

        return {id: existUser.id, first_name: existUser.first_name, last_name: existUser.last_name, email: existUser.email};
    }

    async dataForLogin(userId: number): Promise<{email: string, role: string}> {
        const existUser = await this.usersRepository.findOne({where: {id: userId}});

        if(!existUser) {
            throw new NotFoundException("User not found!");
        }

        return {email: existUser.email, role: existUser.role};
    }
}
