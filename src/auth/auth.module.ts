import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: {expiresIn: '24h'},
      })
    }), 
    SequelizeModule.forFeature([User])
  ],
  providers: [AuthService, JwtGuard, JwtStrategy, RolesGuard],
  controllers: [AuthController]
})
export class AuthModule {}
