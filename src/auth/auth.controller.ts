import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserIf } from './models/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UsePipes(new ValidationPipe())
    @Post('signup')
    signup(@Body() user: CreateUserDto): Promise<UserIf | {warningMessage: string}>{
        return this.authService.registerAccount(user);
    }

    @Post("signin")
    signin(@Body() user: UserIf): Promise<{access_token: string}> {
        return this.authService.login(user);
    }
}
