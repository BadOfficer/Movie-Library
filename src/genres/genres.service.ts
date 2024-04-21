import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './models/genre.model';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenresService {
    constructor(@InjectModel(Genre) private genresRepository: typeof Genre) {}

    async create(createGenreDto: CreateGenreDto) {
        const isExist = await this.findByTitle(createGenreDto.title);
        const newGenre = new Genre();

        if(isExist) {
            throw new BadRequestException("This genre is exist!");
        }

        newGenre.title = createGenreDto.title;
        newGenre.description = createGenreDto.description;

        return newGenre.save();
    }

    async findByTitle(title: string) {
        return this.genresRepository.findOne({where: {title}})
    }
}
