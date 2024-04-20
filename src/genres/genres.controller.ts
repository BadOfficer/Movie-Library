import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Post("create")
    @UseGuards(JwtAuthGuard)
    async createGenre(@Body() genre: CreateGenreDto) {
        return this.genresService.create(genre);
    }
}
