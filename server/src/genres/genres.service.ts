import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './models/genre.model';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreIf } from './models/genre.interface';
import { Op } from 'sequelize';

@Injectable()
export class GenresService {
    constructor(@InjectModel(Genre) private readonly genresRepository: typeof Genre) {}

    async create(createGenreDto: CreateGenreDto): Promise<GenreIf>{
        const isExist = await this.findByTitle(createGenreDto.title);
        const newGenre = new Genre();

        if(isExist) {
            throw new BadRequestException("This genre is exist!");
        }

        newGenre.title = createGenreDto.title;
        newGenre.description = createGenreDto.description;

        return await newGenre.save();
    }

    async findByTitle(title: string): Promise<GenreIf> {
        return this.genresRepository.findOne({where: {title}})
    }

    async getOne(id: number) {
        const genre = await this.genresRepository.findOne({where: {id}})

        if(!genre) {
            throw new NotFoundException("Genre not found!");
        }

        return genre;
    }

    async getAll(count: string, offset: string, query: string): Promise<{rows: GenreIf[], count: number}> {
        if(!query) {
            return await this.genresRepository.findAndCountAll({offset: +offset, limit: +count, include: {all: true}});
        }
        
        return await this.genresRepository.findAndCountAll({offset: +offset, limit: +count, include: {all: true}, where: {
            title: {
                [Op.iLike]: `%${query}%`
              }
        }})
    }

    async update(id: number, newGenreData: UpdateGenreDto): Promise<GenreIf> {
        const genre = await this.genresRepository.findOne({where: {id}})

        if(!genre) {
            throw new NotFoundException("Genre not found!");
        }

        Object.assign(genre, newGenreData);

        return await genre.save();
    }

    async remove(id: number): Promise<string> {
        const genre = await this.genresRepository.findOne({where: {id}})

        if(!genre) {
            throw new NotFoundException("Genre not found!");
        }

        await this.genresRepository.destroy({
            where: {id}
        })

        return `Genre ${genre.title} deleted`;
    }

    async search(query: string): Promise<Genre[]> {
        if (!query) {
            return await Genre.findAll();
          }
          
          const movies = await Genre.findAll({
            where: {
              title: {
                [Op.like]: `%${query}%`
              }
            }
          });
        return movies;
    }
}
