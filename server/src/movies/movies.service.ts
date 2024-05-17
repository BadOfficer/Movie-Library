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
        return this.moviesRepository.findOne({
            where: {
                id
            }, include: {
                model: Genre,
                through: { attributes: [] },
                attributes: ["title"]
            }
        })
    }

    async getOneByTitle(title: string) {
        return this.moviesRepository.findOne({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`
                }
            }, include: {
                model: Genre,
                through: { attributes: [] },
                attributes: ["title"]
            }
        })
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
                [Op.like]: `%${query}%`
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

    async getSeries(filterOptions: FilterOptions): Promise<MovieIf[]> {
        const {genresIds, release, seasons, duration, rating, query, count, offset, series} = filterOptions

        let seriesMovie = await this.moviesRepository.findAll({where: {
            [Op.or]: [
                { seasons: { [Op.gt]: 1 } },
                { series: { [Op.gt]: 1 } } 
            ]
        }, limit: count, offset: offset * count, include: {
            model: Genre
        }});

        if(query) {
            seriesMovie = await this.moviesRepository.findAll({where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { seasons: { [Op.gt]: 1 } },
                            { series: { [Op.gt]: 1 } }
                        ]
                    },
                    {
                        title: {
                            [Op.like]: `%${query}%`
                        }
                    }
                ]
            }, limit: count, offset: offset * count, include: {
                model: Genre
            }})
        }

        if(genresIds) {
            seriesMovie = await this.filterMoviesByGenres(genresIds, seriesMovie);
        }

        if(release) {
            seriesMovie = await this.filterMoviesByRelease(release, seriesMovie);
        }

        if(seasons) {
            seriesMovie = await this.filterMoviesBySeasons(seasons, seriesMovie);
        }

        if(series) {
            seriesMovie = await this.filterMoviesBySeries(series, seriesMovie);
        }

        if(duration) {
            seriesMovie = await this.filterMoviesByDuraion(duration, seriesMovie);
        }

        if(rating) {
            seriesMovie = await this.filterMoviesByRating(rating, seriesMovie);
        }

        return seriesMovie;
    }

    async filterMoviesByGenres(genresIds: string, movies: Movie[]): Promise<Movie[]> {
        if(genresIds) {
            const genresIdValues = genresIds.split(';').map(id => parseInt(id));
            const filteredMovies = movies.filter(movie => 
                movie.genres.some(genre => genresIdValues.includes(genre.id))
            );
            return filteredMovies;
        }
        return movies
    }

    async filterMoviesByRelease(releaseYears: string, movies: Movie[]): Promise<Movie[]> {
        if(releaseYears) {
            const releaseValues = releaseYears.split(';');
            const filteredMovies = movies.filter(movie => 
               releaseValues.includes(movie.release)
            )

            return filteredMovies;
        }
        return movies
    }

    async filterMoviesBySeasons(seasons: string, movies: Movie[]): Promise<Movie[]> {
        if(seasons) {
            const seasonsValues = seasons.split(';');
            const filteredMovies = movies.filter(movie => 
                seasonsValues.includes(movie.seasons.toString())
            )

            return filteredMovies;
        }
        return movies
    }

    async filterMoviesBySeries(series: string, movies: Movie[]): Promise<Movie[]> {
        if(series) {
            const seriesValues = series.split(';');
            const filteredMovies = movies.filter(movie => 
                seriesValues.includes(movie.series.toString())
            )

            return filteredMovies;
        }
        return movies
    }

    async filterMoviesByDuraion(duration: string, movies: Movie[]): Promise<Movie[]> {
        if(duration) {
            const durationValues = duration.split(';');
            const filteredMovies = movies.filter(movie => 
                durationValues.includes(movie.duration)
            )
            
            return filteredMovies;
        }
        return movies
    }

    async filterMoviesByRating(rating: string, movies: Movie[]): Promise<Movie[]> {
        if(rating) {
            const ratingValues = rating.split(';');
            const filteredMovies = movies.filter(movie => 
                ratingValues.includes(movie.rating)
            )

            return filteredMovies;
        }
        return movies
    }

    // async getAllMovies(filterOptions: FilterOptions): Promise<{ rows: Movie[] }> {
    //     const { release, seasons, genreIds, count, offset, query } = filterOptions;
    //     const calculatedOffset = offset * count;
    //     let whereClause: any = {};
    //     let include: any[] = [];
    
        
    //     if (genreIds) {
    //         const genreIdValues = genreIds.split(';').map(id => parseInt(id));
    //         include.push({
    //             model: Genre,
    //             where: {
    //                 [Op.in]: genreIdValues
    //             }
    //         });
    //     }
    
    //     if (release) {
    //         const releaseValues = release.split(';');
    //         whereClause.release = {
    //             [Op.in]: releaseValues
    //         };
    //     }
    
    //     if (seasons) {
    //         const seasonValues = seasons.split(';');
    //         whereClause.seasons = {
    //             [Op.in]: seasonValues
    //         };
    //     }

    //     if (query) {
    //         whereClause.title = {
    //             [Op.like]: `%${query}%`
    //         };
    //     }
    
    //     const movies = await Movie.findAndCountAll({
    //         where: whereClause,
    //         include: include,
    //         limit: count,
    //         offset: calculatedOffset
    //     });
    
    //     return movies;
    // }

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

    async getLastTenCreatedMovies(): Promise<Movie[]> {
        return await this.moviesRepository.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10
        });
    }

    async createMovie(createMovieDto: CreateMovieDto, images: any): Promise<MovieIf> {
        
        const existingMovie = await this.findOne({ where: { title: createMovieDto.title } });
        if (existingMovie) {
            throw new BadRequestException("This movie already exists!");
        }
    
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
}
