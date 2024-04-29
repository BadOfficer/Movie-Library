import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
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
    
    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Get("get-all")
    findAll() {
        return this.moviesService.findAll();
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
}
