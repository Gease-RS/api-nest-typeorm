import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { DatabaseModule } from '../database/database.module';
import { providersRepository } from '../database/typeorm.providers';
import { ImageService } from './image.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ImageController],
  providers: [
    ...providersRepository,
    ImageService
  ]
})
export class ImageModule {}
