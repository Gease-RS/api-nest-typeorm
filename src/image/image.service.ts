import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import Image from './image.entity';

@Injectable()
export class ImageService {
  
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private imageRepository: Repository<Image>,
  ) {}

  async upload(
    file: Express.Multer.File,
    dto: CreateImageDto,
  ): Promise<Image> {

    const avatar = await this.imageRepository.create({
      ...dto,
      url: file.path,
    });

    return await this.imageRepository.save(avatar);
  }

 async findAllImageUser(userId: number) {
    return await this.imageRepository.findOneBy({ userId });
  }
 
  async deleteImage(id: number): Promise<{ message: string }> {
    const image = await this.imageRepository.findOneBy({ id });

    if (!image) {
      throw new BadRequestException('Image not found.');
    }

    await this.imageRepository.delete(id);

    return await { message: 'Image deletada com Sucesso!' };
  }

  async update(file: Express.Multer.File, id: number) {
    const image = await this.imageRepository.findOneBy({ id });
    image.url = file.path;
    return await this.imageRepository.save(image);
  }

  async destroy(id: number) {
    await this.imageRepository.findOneBy({ id });
    return await this.imageRepository.delete(id);
  }
}
