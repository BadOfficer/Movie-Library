import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AddToLikedDto } from './dto/add-to-liked.dto';

@Controller('')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtGuard)
    @Get("profile/personal-data")
    getProfile(@Req() req) {
        return this.usersService.getProfile(+req.user.id);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtGuard)
    @Post("profile/personal-data")
    update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
        return this.usersService.updateUser(updateUserDto, +req.user.id);
    }

    @UseGuards(JwtGuard)
    @Delete("profile/personal-data")
    delete(@Req() req) {
        return this.usersService.deleteUser(+req.user.id);
    }

    @UseGuards(JwtGuard)
    @Post("profile/liked-list/add")
    addToLikedList(@Body() addToLikedDto: AddToLikedDto, @Req() req) {
        return this.usersService.addToLikedList(addToLikedDto, req.user.id);
    }

    @UseGuards(JwtGuard)
    @Delete("profile/liked-list/remove")
    removeFromLikedList(@Body() removeFromLikedDto: AddToLikedDto, @Req() req) {
        return this.usersService.removeFromLikedList(removeFromLikedDto, req.user.id);
    }

    @UseGuards(JwtGuard)
    @Get("profile/liked-list")
    getAllLikes(@Req() req) {
        return this.usersService.getAllLiked(+req.user.id);
    }

    @UseGuards(JwtGuard)
    @Post("profile/bookmarks/add")
    addToBookmarks(@Body() addToBookmarksDto: AddToLikedDto, @Req() req) {
        return this.usersService.addToBookmarks(addToBookmarksDto, req.user.id);
    }

    @UseGuards(JwtGuard)
    @Delete("profile/bookmarks/remove")
    removeFromBookmarks(@Body() removeFromBookmarks: AddToLikedDto, @Req() req) {
        return this.usersService.removeFromBookmarks(removeFromBookmarks, req.user.id);
    }

    @UseGuards(JwtGuard)
    @Get("profile/bookmarks")
    getAllBookmarks(@Req() req) {
        return this.usersService.getAllBookmarks(+req.user.id);
    }
}
