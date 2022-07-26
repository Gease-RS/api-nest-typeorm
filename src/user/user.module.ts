import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { providersRepository } from '../database/typeorm.providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...providersRepository,
    UserService
  ],
})
export class UserModule {}