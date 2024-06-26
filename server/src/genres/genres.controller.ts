import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GenreIf } from './models/genre.interface';

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @UsePipes(new ValidationPipe())
    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Post("create")
    async createGenre(@Body() genre: CreateGenreDto): Promise<GenreIf> {
        return this.genresService.create(genre);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Get("genre/:id")
    getOne(@Param("id") id: string): Promise<GenreIf> {
        return this.genresService.getOne(+id);
    }


    @Get()
    getAll(@Query("count") count: string = "10", @Query("offset") offset: string = "0", @Query("query") query: string = ''): Promise<{rows: GenreIf[], count: number}> {
        return this.genresService.getAll(count, offset, query);
    }

    @Get("/films")
    getAllForFilms() {
        return this.genresService.getAllForFilms();
    }

    @Get("/series")
    getAllForSeries() {
        return this.genresService.getAllForSeries();
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @UsePipes(new ValidationPipe())
    @Patch(":id")
    updateGenre(@Param("id") id: string, @Body() updatedGenre: UpdateGenreDto): Promise<GenreIf> {
        return this.genresService.update(+id, updatedGenre);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Delete(":id")
    deleteGenre(@Param("id") id: string): Promise<string> {
        return this.genresService.remove(+id);
    }
}
