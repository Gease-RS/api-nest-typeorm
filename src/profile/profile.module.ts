import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { DatabaseModule } from '../database/database.module';
import { providersRepository } from '../database/typeorm.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [
    ...providersRepository,
    ProfileService
  ]
})
export class ProfileModule {}
