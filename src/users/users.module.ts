import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Liked } from 'src/liked/models/liked.model';
import { LikedModule } from 'src/liked/liked.module';
import { Bookmarks } from 'src/bookmarks/models/bookmarks.model';
import { BookmarksModule } from 'src/bookmarks/bookmarks.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Liked, Bookmarks]), LikedModule, BookmarksModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
