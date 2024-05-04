import { Module } from '@nestjs/common';
import { LikedController } from './liked.controller';
import { LikedService } from './liked.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Liked } from './models/liked.model';
import { User } from 'src/users/models/user.model';
import { MoviesModule } from 'src/movies/movies.module';
import { Movie } from 'src/movies/models/movie.model';

@Module({
  imports: [SequelizeModule.forFeature([Liked, User, Movie]), MoviesModule],
  controllers: [LikedController],
  providers: [LikedService],
  exports: [LikedService]
})
export class LikedModule {}
