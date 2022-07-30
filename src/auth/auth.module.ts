import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConstants } from './constants';
import { providersRepository } from '../database/typeorm.providers';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '7d' },
      }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, ...providersRepository,
    UserService, JwtStrategy],
})
export class AuthModule {}