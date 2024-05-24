import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { MovieIf } from './models/movie.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GenresService } from 'src/genres/genres.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Op } from 'sequelize';
import { Genre } from 'src/genres/models/genre.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie) private readonly moviesRepository: typeof Movie,
        private readonly genresService: GenresService,
        private filesService: FilesService) { }

    async findOne(filter: { where: { id?: number, title?: string, description?: string, rating?: string, seasons?: string, series?: string } }): Promise<MovieIf> {
        return this.moviesRepository.findOne({ ...filter })
    }

    async getOneById(id: number): Promise<MovieIf> {
        const existMovie = await this.moviesRepository.findOne({
            where: {
                id
            }, include: {
                model: Genre,
                through: { attributes: [] },
                attributes: ["title"]
            }
        })

        if(!existMovie) {
            throw new NotFoundException("Movie not found!");
        }
        
        return existMovie;
    }

    async getMovies(filterOptions: FilterOptions): Promise<{rows: MovieIf[], count: number}> {
        const {genresIds, release, seasons, duration, rating, query, count, offset, series} = filterOptions;
    
        const whereClause: any = {
            [Op.or]: [
                { seasons: 1 },
                { series: 1 }
            ]
        };
    
        if (query) {
            whereClause.title = {
                [Op.iLike]: `%${query}%`
            };
        }
    
        if (release) {
            whereClause.release = {
                [Op.in]: release.split(';')
            };
        }
    
        if (seasons) {
            whereClause.seasons = {
                [Op.in]: seasons.split(';')
            };
        }
    
        if (series) {
            whereClause.series = {
                [Op.in]: series.split(';')
            };
        }
    
        if (duration) {
            whereClause.duration = {
                [Op.in]: duration.split(';')
            };
        }
    
        if (rating) {
            whereClause.rating = {
                [Op.in]: rating.split(';')
            };
        }
    
        const include: any[] = [];
    
        if (genresIds) {
            const genreIdValues = genresIds.split(';').map(id => parseInt(id));
            include.push({
                model: Genre,
                where: {
                    id: {
                        [Op.in]: genreIdValues
                    }
                }
            });
        } else {
            include.push({ model: Genre });
        }
    
        const movies = await this.moviesRepository.findAndCountAll({
            where: whereClause,
            include: include,
            limit: count,
            offset: offset * count
        });
    
        return {
            rows: movies.rows,
            count: movies.count
        };
        
    }    

    async getSeries(filterOptions: FilterOptions): Promise<{rows: MovieIf[], count: number}> {
        const {genresIds, release, seasons, duration, rating, query, count, offset, series} = filterOptions
    
        const whereClause: any = {
            [Op.or]: [
                { seasons: { [Op.gt]: 1 } },
                { series: { [Op.gt]: 1 } }
            ]
        };
    
        if (query) {
            whereClause.title = {
                [Op.iLike]: `%${query}%`
            };
        }
    
        if (release) {
            whereClause.release = {
                [Op.in]: release.split(';')
            };
        }
    
        if (seasons) {
            whereClause.seasons = {
                [Op.in]: seasons.split(';')
            };
        }
    
        if (series) {
            whereClause.series = {
                [Op.in]: series.split(';')
            };
        }
    
        if (duration) {
            whereClause.duration = {
                [Op.in]: duration.split(';')
            };
        }
    
        if (rating) {
            whereClause.rating = {
                [Op.in]: rating.split(';')
            };
        }
    
        const include: any[] = [];
    
        if (genresIds) {
            const genreIdValues = genresIds.split(';').map(id => parseInt(id));
            include.push({
                model: Genre,
                where: {
                    id: {
                        [Op.in]: genreIdValues
                    }
                }
            });
        } else {
            include.push({ model: Genre });
        }
    
        const movies = await this.moviesRepository.findAndCountAll({
            where: whereClause,
            include: include,
            limit: count,
            offset: offset * count
        });
    
        return {
            rows: movies.rows,
            count: movies.count
        };
    }

    async getTopRatedMovies(limit: number = 5): Promise<Movie[]> {
        return this.moviesRepository.findAll({
            order: [['rating', 'DESC']],
            limit: limit, 
            include: {
                model: Genre,
                through: { attributes: [] },
                attributes: ["title"]
            }
        })
    }

    async getLastTenCreatedFilms(limit: number = 10): Promise<Movie[]> {
        return await this.moviesRepository.findAll({
            where: {
                seasons: 1,
                series: 1
            },
            order: [['createdAt', 'DESC']],
            limit
        });
    }

    async getLastTenCreatedSeries(limit: number = 10): Promise<Movie[]> {
        return await this.moviesRepository.findAll({
            where: {
                seasons: {
                    [Op.gt]: 1
                },
                series: {
                    [Op.gt]: 1
                }
            },
            order: [['createdAt', 'DESC']],
            limit
        });
    }

    async createMovie(createMovieDto: CreateMovieDto, images: any): Promise<MovieIf> {
        const [imagesNames, validatedGenres] = await Promise.all([
            this.filesService.createFiles(images),
            Promise.all(createMovieDto.genres.split(",").map(async (idGenre) => {
                const genre = await this.genresService.getOne(+idGenre);
                if (!genre) {
                    throw new BadRequestException(`Genre with ID ${idGenre} does not exist!`);
                }
                return +idGenre;
            }))
        ]);
    
        const newMovie = new Movie({
            title: createMovieDto.title,
            description: createMovieDto.description,
            images: JSON.stringify(imagesNames),
            release: createMovieDto.release,
            seasons: +createMovieDto.seasons,
            series: +createMovieDto.series,
            duration: createMovieDto.duration,
            rating: createMovieDto.rating,
        });
    
        await newMovie.save();
    
        await newMovie.$add("genres", validatedGenres);
    
        return newMovie;
    }
    

    async updateMovie(updateMovieDto: UpdateMovieDto, movieId: number): Promise<MovieIf> {
        const existMovie = await this.moviesRepository.findOne({ where: { id: movieId } });
        const existMovieByTitle = await this.moviesRepository.findOne({ where: {title: updateMovieDto.title}})

        if (!existMovie) {
            throw new NotFoundException("This movie not found!");
        }

        if(existMovieByTitle) {
            throw new BadRequestException("This movie is exist!")
        }

        Object.assign(existMovie, updateMovieDto);

        const [validatedGenres] = await Promise.all([
            Promise.all(updateMovieDto.genres.split(",").map(async (idGenre) => {
                const genre = await this.genresService.getOne(+idGenre);
                if (!genre) {
                    throw new BadRequestException(`Genre with ID ${idGenre} does not exist!`);
                }
                return +idGenre;
            }))
        ]);

        await existMovie.$set("genres", validatedGenres)

        return await existMovie.save();
    }

    async deleteMovie(movieId: number): Promise<string> {
        const existMovie = await this.moviesRepository.findOne({ where: { id: movieId } });

        if (!existMovie) {
            throw new NotFoundException("This movie not found!");
        }

        await existMovie.destroy();

        return `Movie ${existMovie.title} is deleted!`;
    }

    async getAllMovies(query: string, count: number, offset: number): Promise<{rows: MovieIf[], count: number}> {
        if (query) {
            const movies = await this.moviesRepository.findAndCountAll({
                where: {
                    title: {
                        [Op.iLike]: `%${query}%`
                    }
                },
                limit: count,
                offset: offset * count
            });

            return movies
        }

        return await this.moviesRepository.findAndCountAll({
            limit: count,
            offset: offset * count
        });
    }
}
