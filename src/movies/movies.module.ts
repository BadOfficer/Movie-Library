import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { Genre } from 'src/genres/models/genre.model';
import { MoviesGenres } from './models/movies-genres.model';
import { GenresModule } from 'src/genres/genres.module';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/models/user.model';
import { LikedList } from 'src/users/models/liked-list.model';

@Module({
  imports: [SequelizeModule.forFeature([Movie, Genre, MoviesGenres, User, LikedList]), GenresModule, FilesModule],
  providers: [MoviesService],
  controllers: [MoviesController],
  exports: [MoviesService]
})
export class MoviesModule {}
