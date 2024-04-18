import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: "postgres",
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models:[User],
    synchronize: true,
    autoLoadModels: true,
  }),
  UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
