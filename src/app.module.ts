import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { GenresModule } from './genres/genres.module';
import { Genre } from './genres/models/genre.model';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/models/user.model';


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
    models:[Genre, User],
    synchronize: true,
    autoLoadModels: true,
  }),
  GenresModule,
  AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
