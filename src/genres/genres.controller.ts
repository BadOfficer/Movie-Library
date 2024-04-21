import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @UsePipes(new ValidationPipe())
    @Post("create")
    async createGenre(@Body() genre: CreateGenreDto) {
        return this.genresService.create(genre);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.genresService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updateGenre(@Param("id") id: string, @Body() updatedGenre: UpdateGenreDto) {
        return this.genresService.update(+id, updatedGenre);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteGenre(@Param("id") id: string) {
        return this.genresService.remove(+id);
    }
}
