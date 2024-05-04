import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bookmarks } from './models/bookmarks.model';
import { MoviesService } from 'src/movies/movies.service';
import { Movie } from 'src/movies/models/movie.model';

@Injectable()
export class BookmarksService {
    constructor(@InjectModel(Bookmarks) private bookmarksRepository: typeof Bookmarks,
                                        private moviesService: MoviesService) {}

    async getOne(userId: number, movieId: number) {
        const movie = await this.bookmarksRepository.findOne({where: {userId}, include: {
            model: Movie,
            where: {
                id: movieId
            }
        }})
        
        return movie;
    }

    async create(userId: number): Promise<Bookmarks> {
        const bookmarks = new Bookmarks();
        bookmarks.userId = userId;
        await bookmarks.$set("movies", []);

        return await bookmarks.save()
    }

    async add(userId: number, movieId: number): Promise<Bookmarks> {
        const existLiked = await this.bookmarksRepository.findOne({where: {userId}, include: {all: true}});
        const existMovie = await this.moviesService.findOneById(movieId);
        
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

    async remove(userId: number, movieId: number): Promise<Bookmarks> {
        const existLiked = await this.bookmarksRepository.findOne({ where: { userId }, include: {all: true} });
        const existMovie = await this.moviesService.findOneById(movieId);
        const existBookmarkedMovie = await this.getOne(userId, movieId);
        
        if (!existLiked) {
            throw new NotFoundException("liked not found!");
        }
        if(!existMovie) {
            throw new NotFoundException("Movie not found!")
        }
        if(!existBookmarkedMovie) {
            throw new NotFoundException("Movie not found!")
        }
    
        await existLiked.$remove("movies", existMovie.id);

        await existLiked.reload();

        return existLiked;
    }

    async getAll(userId: number): Promise<Bookmarks> {
        const existLiked = await this.bookmarksRepository.findOne({ 
            where: { userId },
            include: [{ model: Movie, as: 'movies' }] });
        
        if (!existLiked) {
            throw new NotFoundException("liked not found!");
        }

        return existLiked;
    }
}
