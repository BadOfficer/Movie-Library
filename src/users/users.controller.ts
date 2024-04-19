import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async register(@Body() user: CreateUserDto) {
        return this.usersService.create(user);
    }
}
