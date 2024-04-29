import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { Genre } from 'src/genres/models/genre.model';
import { MoviesGenres } from './models/movies-genres.model';
import { GenresModule } from 'src/genres/genres.module';

@Module({
  imports: [SequelizeModule.forFeature([Movie, Genre, MoviesGenres]), GenresModule],
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule {}
