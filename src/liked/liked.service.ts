import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Liked } from './models/liked.model';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class LikedService {
    constructor(@InjectModel(Liked) private likedRepository: typeof Liked,
                                    private moviesService: MoviesService) {}

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

    async getAll(userId: number) {
        const existLiked = await this.likedRepository.findOne({ where: { userId } });
        if (!existLiked) {
            throw new NotFoundException("liked not found!");
        }
        const movies = []
        existLiked.moviesId.map(movieId => {
            movies.push(this.moviesService.findOne({where: {id: +movieId}}))
        })

        return movies
    }
}
