import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageStorage } from '../helpers/image.storage';

@Controller('v1/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('register')
  async create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('url', saveImageStorage))
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Anexe uma imagem');
    } else {
      console
    }
  }
  
  @Get('listar')
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profileService.findOneBy(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  destroy(@Param('id') id: number) {
    return this.profileService.destroy(id);
  }
}
