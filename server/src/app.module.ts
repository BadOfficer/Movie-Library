import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { GenresModule } from './genres/genres.module';
import { Genre } from './genres/models/genre.model';
import { AuthModule } from './auth/auth.module';
import { User } from './users/models/user.model';
import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/models/movie.model';
import { MoviesGenres } from './movies/models/movies-genres.model';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { LikedModule } from './liked/liked.module';
import { Liked } from './liked/models/liked.model';
import { LikedMovies } from './liked/models/liked-movies.model';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { Bookmarks } from './bookmarks/models/bookmarks.model';
import { BookmarksMovies } from './bookmarks/models/bookmarks-movies.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true
  }),SequelizeModule.forRoot({
    dialect: "postgres",
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models:[Genre, User, Movie, MoviesGenres, Liked, LikedMovies, Bookmarks, BookmarksMovies],
    synchronize: true,
    autoLoadModels: true,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, 'static'),
  }),
  GenresModule,
  AuthModule,
  MoviesModule,
  UsersModule,
  FilesModule,
  LikedModule,
  BookmarksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
