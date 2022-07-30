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

  async getAllImages(): Promise<Image[]> {
    return this.imageRepository.find({
      relations: ['user'],  
      order: {
        createdAt: 'DESC',
      },
    });
  }
 
  async deleteImage(userId: number, id: number): Promise<{ message: string }> {
    const image = await this.imageRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!image) {
      throw new BadRequestException('Image not found.');
    }

    await this.imageRepository.delete(id);

    return { message: 'Imagem deletada com Sucesso!' };
  }

  async findAll() {
    return await this.imageRepository.find();
  }

  async destroy(id: number) {
    await this.imageRepository.findOneBy({ id });
    return await this.imageRepository.delete(id);
  }
}
