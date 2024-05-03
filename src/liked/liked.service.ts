import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Liked } from './models/liked.model';

@Injectable()
export class LikedService {
    constructor(@InjectModel(Liked) private likedRepository: typeof Liked) {}

    async create(userId: number) {
        return this.likedRepository.create({
            userId: userId,
            moviesId: []
        })
    }

    async delete(userId: number) {
        const existLiked = await this.likedRepository.findOne({where: {userId}});
        if(!existLiked) {
            throw new NotFoundException("liked not found!")
        }
        return existLiked.destroy();
    }

    async add(userId: number, movieId: number) {
        const existLiked = await this.likedRepository.findOne({where: {userId}});
        if(!existLiked) {
            throw new NotFoundException("liked not found!")
        }
        existLiked.moviesId = [...existLiked.moviesId, movieId];

        await existLiked.save()

        return existLiked;
    }

    async remove(userId: number, movieId: number) {
        const existLiked = await this.likedRepository.findOne({ where: { userId } });
        if (!existLiked) {
            throw new NotFoundException("liked not found!");
        }
        
        const updatedMoviesId = existLiked.moviesId.filter(id => id !== movieId);
    
        existLiked.moviesId = updatedMoviesId;
    
        await existLiked.save();
    
        return existLiked;
    }
}
