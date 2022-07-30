import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFile, Res, Req, ResponseDecoratorOptions, BadRequestException, createParamDecorator, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { saveImageStorage } from '../helpers/image.storage';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageService } from './image.service';

const GetCurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) {
      throw new ForbiddenException('You are not authenticated');
    }
    return request.user;
  },
);

@Controller('v1/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/:userId')
  @UseInterceptors(
    FileInterceptor('url', saveImageStorage))
    upload(
      //@GetCurrentUser() user: User,
      @UploadedFile() file: Express.Multer.File,
      @Body() dto: CreateImageDto,
      ) {
    if (!file) {
      throw new Error('Anexe uma imagem');
    } else {    
      return this.imageService.upload(file, dto)
    }
  }

  @Get('picture/:filename')
  async getPicture(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: './upload/avatar' });
  }

  //getAllImages
  @Get('listar')
  async getAllImages() {
    return await this.imageService.findAll();
  }
  //deleteImage
  @Delete('delete/:id')
  async deleteImage(@Param('id') id: number) {
    return await this.imageService.destroy(id);
  }

  /*

  @Patch(':id/update')
  update(@Param('id') id: number, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(id, updateImageDto);
  }
  
  

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.imageService.findOneBy(id);
  }
  
  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.imageService.destroy(id);
  }
  */
}
