import { Body, Controller, Get, HttpStatus, Post, Req, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Roles } from './decorators/roles.decorator';
import { RoleGuard } from './guards/role.guard';
import { authenticate } from 'passport';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
        
        try{
            const response = await this.authService.validateUser(authenticateDto);
            return res.status(HttpStatus.OK).json({ response })
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    }

    @Roles('admin')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    profile(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(req.user);
    }
}
