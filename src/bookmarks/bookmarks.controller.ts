import { Body, Controller, Delete, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AddBookmarksDto } from './dto/add-bookmarks.dto';
import { RemoveBookmarksDto } from './dto/remove-bookmarks.dto';

@Controller('bookmarks')
export class BookmarksController {
    constructor(private readonly bookmarksService: BookmarksService) {}

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtGuard)
    @Post("add")
    add(@Req() req, @Body() addBookmarkDto: AddBookmarksDto) {
        return this.bookmarksService.add(req.user.id, addBookmarkDto.movieId);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtGuard)
    @Delete("remove")
    remove(@Req() req, @Body() removeBookmarkDto: RemoveBookmarksDto) {
        return this.bookmarksService.remove(req.user.id, removeBookmarkDto.movieId)
    }

    @UseGuards(JwtGuard)
    @Get()
    getAll(@Req() req) {
        return this.bookmarksService.getAll(+req.user.id);
    }
}
