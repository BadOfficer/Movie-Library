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
    @Get(":id")
    getOne(@Param("id") id: string): Promise<GenreIf> {
        return this.genresService.getOne(+id);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Get("get-all")
    getAll(@Query("count") count: string, @Query("offset") offset: string): Promise<{rows: GenreIf[]}> {
        return this.genresService.getAll(+count, +offset);
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


    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Get("/search")
    searchGenre(@Query("query") query: string): Promise<GenreIf[]> {
        return this.genresService.search(query);
    }
}
