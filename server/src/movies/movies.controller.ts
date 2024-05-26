import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieIf } from './models/movie.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/models/role.enum';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @UsePipes(new ValidationPipe())
    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Post("create")
    @UseInterceptors(FilesInterceptor('images'))
    create(@Body() movie: CreateMovieDto, @UploadedFiles() images): Promise<MovieIf> {
        return this.moviesService.createMovie(movie, images);
    }

    @Get('/films')
    getAllFilms(
        @Query('count') count: string = "18",
        @Query('offset') offset: string = "0",
        @Query('query') query: string = '',
        @Query('release') release: string = '',
        @Query('seasons') seasons: string = '',
        @Query('series') series: string = '',
        @Query('genresIds') genresIds: string = '',
        @Query('duration') duration: string = '',
        @Query('rating') rating: string = '',
    ) {
        const filterOptions = {
            count: +count,
            offset: +offset,
            query,
            release,
            seasons,
            series,
            genresIds,
            duration,
            rating
        };
        return this.moviesService.getMovies(filterOptions);
    }
    @Get('/series-films')
    getAllSeries (
        @Query('count') count: string = "18",
        @Query('offset') offset: string = "0",
        @Query('query') query: string = '',
        @Query('release') release: string,
        @Query('seasons') seasons: string,
        @Query('series') series: string,
        @Query('genresIds') genresIds: string,
        @Query('duration') duration: string,
        @Query('rating') rating: string,
    ) {
        const filterOptions = {
            count: +count,
            offset: +offset,
            query,
            release,
            seasons,
            series,
            genresIds,
            duration,
            rating
        };
        return this.moviesService.getSeries(filterOptions);
    }

    @Get("last-films")
    getLastTenFilms() {
        return this.moviesService.getLastTenCreatedFilms();
    }

    @Get("last-series")
    getLastTenSeries() {
        return this.moviesService.getLastTenCreatedSeries();
    }

    @Get('slider')
    getFiveBetterMovies() {
        return this.moviesService.getTopRatedMovies();
    }

    @UsePipes(new ValidationPipe())
    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() newMovie: UpdateMovieDto): Promise<MovieIf> {
        return this.moviesService.updateMovie(newMovie, +id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(":id")
    delete(@Param("id") id: string): Promise<string> {
        return this.moviesService.deleteMovie(+id);
    }

    @Get(":id")
    getOneById(@Param("id") id: string): Promise<MovieIf> {
        return this.moviesService.getOneById(+id);
    }

    @Get('')
    getAllMovies(@Query('query') query: string = '', @Query('count') count: string = "18", @Query('offset') offset: string = "0"): Promise<{rows: MovieIf[], count: number}> {
        return this.moviesService.getAllMovies(query, +count, +offset);
    }
}
