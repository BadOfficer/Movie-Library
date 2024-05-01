import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { MovieIf } from './models/movie.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GenresService } from 'src/genres/genres.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Op } from 'sequelize';
import { Genre } from 'src/genres/models/genre.model';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie) private readonly moviesRepository: typeof Movie, 
                                    private readonly genresService: GenresService) {}

    async findOne(filter: {where: {id?: number, title?: string, description?: string, rating?: string, seasons?: string, series?: string}}): Promise<MovieIf> {
        return this.moviesRepository.findOne({...filter})
    }

    async findOneById(id: number) {
        return this.moviesRepository.findOne({where: {
            id
        }, include: {
            model: Genre,
            through: { attributes: [] },
            attributes: ["title"]
        }})
    }

    async getAll(count = 10, offset = 0, release = '', seasons = "", genreIds=""): Promise<{rows: Movie[]}> {
        if(!release && !seasons && !genreIds) {
            return await this.moviesRepository.findAndCountAll({offset, limit: count, include: {all: true}});
        }

        let whereClause: any = {};
        let include: any[] = [];

        if (genreIds) {
            const genreIdValues = genreIds.split(',').map(id => parseInt(id));
            include.push({
                model: Genre,
                where: {
                    id: genreIdValues
                }
            });
        }

        if (release) {
            const releaseValues = release.split(',');
            whereClause.release = releaseValues;
        }
        if (seasons) {
            const seasonValues = seasons.split(',');
            whereClause.seasons = seasonValues;
        }
        

        const movies = await this.moviesRepository.findAndCountAll({where: whereClause, offset, limit: count,  include: include});

        
        return movies;
    }

    async search(query: string): Promise<Movie[]> {
        if (!query) {
            return await Movie.findAll();
          }
          
          const movies = await Movie.findAll({
            where: {
              title: {
                [Op.like]: `%${query}%`
              }
            }
          });
        return movies;
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
            const genre = await this.genresService.getOne(+idGenre);

            if(!genre) {
                throw new BadRequestException("This genre is not exist!");
            }

            await newMovie.$add("genres", [genre.id]);
        })
        return newMovie;
    }

    async updateMovie(updateMovieDto: UpdateMovieDto, movieId: number): Promise<MovieIf> {
        
        const existMovie = await this.moviesRepository.findOne({where: {id: movieId}});

        if(!existMovie) {
            throw new NotFoundException("This movie not found!");
        }

        Object.assign(existMovie, updateMovieDto);

        existMovie.$set("genres", [])

        updateMovieDto.genres.map(async(idGenre) => {
            const genre = await this.genresService.getOne(+idGenre);

            if(!genre) {
                throw new BadRequestException("This genre is not exist!");
            }

            await existMovie.$add("genres", [genre.id]);
        })

        return await existMovie.save();
    }

    async deleteMovie(movieId: number): Promise<string> {
        const existMovie = await this.moviesRepository.findOne({where: {id: movieId}});

        if(!existMovie) {
            throw new NotFoundException("This movie not found!");
        }

        await existMovie.destroy();

        return `Movie ${existMovie.title} is deleted!`;
    }
}
