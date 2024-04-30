import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private authService: AuthService) {}

    async update(updateUser:UpdateUserDto, id: number) {
        return this.authService.updateUser(updateUser, id);
    }
}
