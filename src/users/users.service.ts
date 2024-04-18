import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({where: {email}})
    }
}
