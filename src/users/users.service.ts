import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from "bcrypt";
import { UserIf } from './models/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddToLikedDto } from './dto/add-to-liked.dto';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersRepository: typeof User,
                private moviesService: MoviesService) {}

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
        user.$set("likedList", []);

        await user.save()

        const {first_name, last_name, email, password, role} = user

        return {first_name, last_name, email, role};
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

    async getProfile(userId: number) {
        const existUser = await this.usersRepository.findOne({where: {id: userId}, include: {all: true}});

        if(!existUser) {
            throw new NotFoundException("User not found!");
        }

        return existUser;
    }

    async addToLikedList(addToLikedDto: AddToLikedDto, userId: number) {
        const existUser = await this.usersRepository.findOne({where: {id: userId}, include: {all: true}});
        const existMovie = await this.moviesService.findOne({where: {id: +addToLikedDto.movieId}});

        if(!existUser) {
            throw new NotFoundException("User not found!");
        }

        if(!existMovie) {
            throw new NotFoundException("Movie not found!");
        }

        await existUser.$add("likedList", existMovie.id);
        const likedMovieItem = await existUser.reload()

        return likedMovieItem;
    }

    async removeFromLikedList(removeFromLikedDto: AddToLikedDto, userId: number) {
        const existUser = await this.usersRepository.findOne({ where: { id: userId }, include: { all: true } });
        const existMovie = await this.moviesService.findOne({ where: { id: +removeFromLikedDto.movieId } });
    
        if (!existUser) {
            throw new NotFoundException("User not found!");
        }
    
        if (!existMovie) {
            throw new NotFoundException("Movie not found!");
        }
    
        await existUser.$remove("LikedList", existMovie.id);
        console.log(existUser.likedList);
        

        return existUser.reload();
    }

    async getAllLiked(userId: number) {
        const existUser = await this.usersRepository.findOne({ where: { id: userId }, include: { all: true } });
    
        if (!existUser) {
            throw new NotFoundException("User not found!");
        }

        return existUser.likedList;

    }

    async addToBookmarks(addToBookmarks: AddToLikedDto, userId: number) {
        const existUser = await this.usersRepository.findOne({where: {id: userId}, include: {all: true}});
        const existMovie = await this.moviesService.findOne({where: {id: +addToBookmarks.movieId}});

        if(!existUser) {
            throw new NotFoundException("User not found!");
        }

        if(!existMovie) {
            throw new NotFoundException("Movie not found!");
        }

        await existUser.$add("bookmarks", existMovie.id);
        const bookmarksItem = await existUser.reload()

        return bookmarksItem;
    }

    async removeFromBookmarks(removeFromBookmarks: AddToLikedDto, userId: number) {
        const existUser = await this.usersRepository.findOne({ where: { id: userId }, include: { all: true } });
        const existMovie = await this.moviesService.findOne({ where: { id: +removeFromBookmarks.movieId } });
    
        if (!existUser) {
            throw new NotFoundException("User not found!");
        }
    
        if (!existMovie) {
            throw new NotFoundException("Movie not found!");
        }
    
        await existUser.$remove("bookmarks", existMovie.id);

        return await existUser.reload();
    }

    async getAllBookmarks(userId: number) {
        const existUser = await this.usersRepository.findOne({ where: { id: userId }, include: { all: true } });
    
        if (!existUser) {
            throw new NotFoundException("User not found!");
        }

        return existUser.bookmarks;

    }
}
