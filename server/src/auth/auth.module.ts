import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: {expiresIn: '24h'},
      })
    }), 
    UsersModule
  ],
  providers: [AuthService, JwtGuard, JwtStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
