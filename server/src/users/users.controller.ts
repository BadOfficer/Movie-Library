import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DeleteProfileIf } from './models/user.interface';

@Controller('')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtGuard)
    @Get("profile/personal-data")
    getProfile(@Req() req) {
        return this.usersService.getProfile(+req.user.id);
    }


    @UseGuards(JwtGuard)
    @Get("user")
    getDataForLogin(@Req() req) {
        return this.usersService.dataForLogin(+req.user.id);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtGuard)
    @Patch("profile/personal-data")
    update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
        return this.usersService.updateUser(updateUserDto, +req.user.id);
    }

    @UseGuards(JwtGuard)
    @Delete("profile/personal-data")
    delete(@Body() password: DeleteProfileIf, @Req() req) {
        return this.usersService.deleteUser(password, +req.user.id);
    }
}
