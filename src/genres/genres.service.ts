import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './models/genre.model';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { UserIf } from 'src/auth/models/user.interface';

@Injectable()
export class GenresService {
    constructor(@InjectModel(Genre) private readonly genresRepository: typeof Genre) {}

    async create(createGenreDto: CreateGenreDto, user: UserIf) {
        const isExist = await this.findByTitle(createGenreDto.title);
        const newGenre = new Genre();

        if(isExist) {
            throw new BadRequestException("This genre is exist!");
        }

        newGenre.title = createGenreDto.title;
        newGenre.description = createGenreDto.description;

        await newGenre.save()

        return user;
    }

    async findByTitle(title: string) {
        return this.genresRepository.findOne({where: {title}})
    }

    async findOne(id: number) {
        const genre = await this.genresRepository.findOne({where: {id}})

        if(!genre) {
            throw new NotFoundException("Genre not found!");
        }

        return genre;
    }

    async findAll() {
        return this.genresRepository.findAll();
    }

    async update(id: number, newGenreData: UpdateGenreDto) {
        const genre = await this.genresRepository.findOne({where: {id}})

        if(!genre) {
            throw new NotFoundException("Genre not found!");
        }

        Object.assign(genre, newGenreData);

        return await genre.save();
    }

    async remove(id: number) {
        const genre = await this.genresRepository.findOne({where: {id}})

        if(!genre) {
            throw new NotFoundException("Genre not found!");
        }

        await this.genresRepository.destroy({
            where: {id}
        })

        return "Genre deleted";
    }
}
