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

    async getAllMoviesWithFilterAndPagination(filterOptions: FilterOptions): Promise<{ rows: Movie[] }> {
        const { release, seasons, genreIds, count, offset } = filterOptions;
        const page = Math.floor(offset / count);
        const calculatedOffset = offset * count;
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
    
        const movies = await Movie.findAndCountAll({
            where: whereClause,
            include: include,
            limit: count,
            offset: calculatedOffset
        });
    
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
