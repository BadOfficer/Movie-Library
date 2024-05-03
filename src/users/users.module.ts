import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Liked } from 'src/liked/models/liked.model';
import { LikedModule } from 'src/liked/liked.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Liked]), LikedModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
