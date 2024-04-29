import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { MovieIf } from './models/movie.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GenresService } from 'src/genres/genres.service';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie) private readonly moviesRepository: typeof Movie, private readonly genresService: GenresService) {}

    async findOne(filter: {where: {id?: string, title?: string, description?: string, rating?: string, seasons?: string, series?: string}}): Promise<MovieIf> {
        return this.moviesRepository.findOne({...filter})
    }

    async findAll() {
        return this.moviesRepository.findAll({include: {all: true}});
    }

    async createMovie(createMovieDto: CreateMovieDto): Promise<MovieIf> {
        const isExistMovie = await this.findOne({where: {title: createMovieDto.title}});

        if(isExistMovie) {
            throw new BadRequestException("This movie is exist!");
        }

        const newMovie = new Movie({
            title: createMovieDto.title,
            description: createMovieDto.description,
            images: createMovieDto.images,
            release: createMovieDto.release,
            seasons: createMovieDto.seasons,
            series: createMovieDto.series,
            duration: createMovieDto.duration,
            rating: createMovieDto.rating,
        });

        await newMovie.save();
        
        newMovie.$set("genres", [])

        createMovieDto.genres.map(async(idGenre) => {
            const genre = await this.genresService.findOne(+idGenre);

            if(!genre) {
                throw new BadRequestException("This genre is not exist!");
            }

            await newMovie.$add("genres", [genre.id]);
        })
        return newMovie;
    }
}
