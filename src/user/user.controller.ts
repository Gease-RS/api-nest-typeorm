import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './user.service';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('novo')
  async create(@Body() createUserlDto: CreateUserDto) {
    return this.userService.create(createUserlDto);
  }

  @Get('listar')
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number, 
    @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }
 
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy( @Param('id') id: number){
    return await this.userService.destroy(id);
  }

}