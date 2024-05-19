import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Liked } from './models/liked.model';
import { MoviesService } from 'src/movies/movies.service';
import { Movie } from 'src/movies/models/movie.model';
import { LikedIf } from './models/liked.interface';

@Injectable()
export class LikedService {
    constructor(@InjectModel(Liked) private likedRepository: typeof Liked,
                                    private moviesService: MoviesService) {}

    async getOne(userId: number, movieId: number) {
        const movie = await this.likedRepository.findOne({where: {userId}, include: {
            model: Movie,
            where: {
                id: movieId
            }
        }})
        
        return movie;
    }

    async create(userId: number): Promise<Liked> {
        const likedList = new Liked();
        likedList.userId = userId;
        await likedList.$set("movies", []);

        return await likedList.save()
    }

    async add(userId: number, movieId: number): Promise<Liked> {
        const existLiked = await this.likedRepository.findOne({where: {userId}, include: {all: true}});
        const existMovie = await this.moviesService.getOneById(movieId);
        if(!existLiked) {
            throw new NotFoundException("liked not found!")
        }
        if(!existMovie) {
            throw new NotFoundException("Movie not found!")
        }

        await existLiked.$add("movies", existMovie.id);

        await existLiked.reload();

        return existLiked;
    }

    async remove(userId: number, movieId: number): Promise<Liked> {
        const existLiked = await this.likedRepository.findOne({ where: { userId }, include: {all: true} });
        const existMovie = await this.moviesService.getOneById(movieId);
        const existLikedMovie = await this.getOne(userId, movieId);
        if (!existLiked) {
            throw new NotFoundException("liked not found!");
        }
        if(!existMovie) {
            throw new NotFoundException("Movie not found!")
        }
        if(!existLikedMovie) {
            throw new NotFoundException("Movie not found!")
        }

        await existLiked.$remove("movies", existMovie.id);

        await existLiked.reload();

        return existLiked;
    }

    async getAll(userId: number, query: string): Promise<LikedIf> {
        const existLiked = await this.likedRepository.findOne({ 
            where: { userId },
            include: [{ model: Movie, as: 'movies' }] });
        
        if (!existLiked) {
            throw new NotFoundException("liked not found!");
        }

        if(query) {
            return this.search(existLiked, query);
        }

        return existLiked;
    }

    async search(liked: LikedIf, query: string): Promise<LikedIf> {
        if(query) {
            return {
                userId: liked.userId,
                movies: liked.movies.filter(movie => movie.title.includes(query))
            }
        }

        return liked;
    }
}
