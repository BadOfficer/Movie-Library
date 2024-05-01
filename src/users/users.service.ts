import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIf } from 'src/auth/models/user.interface';

@Injectable()
export class UsersService {
    constructor(private authService: AuthService) {}

    async update(updateUser:UpdateUserDto, id: number):Promise<UserIf> {
        return this.authService.updateUser(updateUser, id);
    }

    async getProfile(userId: number):Promise<UserIf> {
        return this.authService.findOne({where: {id: userId}});
    }

    async deleteAccount(userId: number): Promise<string> {
        return this.authService.deleteUser(userId);
    }
}
