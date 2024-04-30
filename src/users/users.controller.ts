import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtGuard)
    @Post("profile/personal-data")
    update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
        return this.usersService.update(updateUserDto, +req.user.id);
    }
}
