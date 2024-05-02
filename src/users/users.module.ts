import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Movie } from 'src/movies/models/movie.model';
import { LikedList } from './models/liked-list.model';
import { MoviesModule } from 'src/movies/movies.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Movie, LikedList]), MoviesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}