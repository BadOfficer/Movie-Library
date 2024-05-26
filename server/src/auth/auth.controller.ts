import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserIf } from '../users/models/user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('sign-up')
    signup(@Body() user: CreateUserDto): Promise<UserIf | {warningMessage: string}>{
        return this.authService.registerAccount(user);
    }

    @Post("sign-in")
    signin(@Body() user: UserIf): Promise<{access_token: string}> {
        return this.authService.login(user);
    }
}
