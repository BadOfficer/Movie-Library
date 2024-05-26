import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bookmarks } from './models/bookmarks.model';
import { User } from 'src/users/models/user.model';
import { Movie } from 'src/movies/models/movie.model';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [SequelizeModule.forFeature([Bookmarks, User, Movie]), MoviesModule],
  providers: [BookmarksService],
  controllers: [BookmarksController],
  exports: [BookmarksService]
})
export class BookmarksModule {}
