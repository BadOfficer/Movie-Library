import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtGuard)
    @Get("profile/personal-data")
    getProfile(@Req() req) {
        return this.usersService.getProfile(+req.user.id);
    }

    @UseGuards(JwtGuard)
    @Post("profile/personal-data")
    update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
        return this.usersService.updateUser(updateUserDto, +req.user.id);
    }

    @UseGuards(JwtGuard)
    @Delete("profile/personal-data")
    delete(@Req() req) {
        return this.usersService.deleteUser(+req.user.id)
    }
}
