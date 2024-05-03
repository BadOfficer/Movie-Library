import { Body, Controller, Delete, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LikedService } from './liked.service';
import { AddLikedDto } from './dto/add-liked.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('liked')
export class LikedController {
    constructor(private readonly likedService: LikedService) {}

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtGuard)
    @Post("add")
    add(@Req() req, @Body() addLikedDto: AddLikedDto) {
        return this.likedService.add(req.user.id, addLikedDto.movieId);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtGuard)
    @Delete("remove")
    remove(@Req() req, @Body() addLikedDto: AddLikedDto) {
        return this.likedService.remove(req.user.id, addLikedDto.movieId)
    }
}
