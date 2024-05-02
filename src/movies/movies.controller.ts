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
import { Movie } from './models/movie.model';

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
    
    @Get()
    getAll(@Query("count") count: number, @Query("offset") offset: number, @Query("release") release: string, @Query("seasons") seasons: string, @Query("genreIds") genreIds: string) {
        return this.moviesService.getAll(count, offset, release, seasons, genreIds);
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

    @Get("/search")
    search(@Query("query") query: string): Promise<Movie[]> {
        return this.moviesService.search(query);
    }

    @Get(":id")
    getOne(@Param("id") id: string): Promise<MovieIf> {
        return this.moviesService.findOneById(+id);
    }
}
