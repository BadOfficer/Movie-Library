import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @UsePipes(new ValidationPipe())
    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Post("create")
    async createGenre(@Body() genre: CreateGenreDto, @Request() req) {
        return this.genresService.create(genre, req.user);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.genresService.findOne(+id);
    }

    @UsePipes(new ValidationPipe())
    @Patch(":id")
    async updateGenre(@Param("id") id: string, @Body() updatedGenre: UpdateGenreDto) {
        return this.genresService.update(+id, updatedGenre);
    }

    @Delete(":id")
    async deleteGenre(@Param("id") id: string) {
        return this.genresService.remove(+id);
    }
}
