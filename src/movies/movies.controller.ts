import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieIf } from './models/movie.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Post("create")
    create(@Body() movie: CreateMovieDto): Promise<MovieIf> {
        return this.moviesService.createMovie(movie);
    }
    
    @Get()
    getAll(@Query("count") count: number, @Query("offset") offset: number, @Query("release") release: string, @Query("seasons") seasons: string, @Query("genreIds") genreIds: string) {
        return this.moviesService.getAll(count, offset, release, seasons, genreIds);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() newMovie: UpdateMovieDto) {
        return this.moviesService.updateMovie(newMovie, +id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.moviesService.deleteMovie(+id);
    }

    @Get("/search")
    search(@Query("query") query: string) {
        return this.moviesService.search(query);
    }

    @Get(":id")
    getOne(@Param("id") id: string) {
        return this.moviesService.findOneById(+id);
    }
}
