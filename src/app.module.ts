import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GenresModule } from './genres/genres.module';
import { Genre } from './genres/models/genre.model';


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
    models:[User, Genre],
    synchronize: true,
    autoLoadModels: true,
  }),
  UsersModule,
  AuthModule,
  GenresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
