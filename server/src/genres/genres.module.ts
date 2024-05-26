import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genre } from './models/genre.model';
import { Movie } from 'src/movies/models/movie.model';
import { MoviesGenres } from 'src/movies/models/movies-genres.model';

@Module({
  imports: [SequelizeModule.forFeature([Genre, Movie, MoviesGenres])],
  providers: [GenresService],
  controllers: [GenresController],
  exports: [GenresService],
})
export class GenresModule {}
