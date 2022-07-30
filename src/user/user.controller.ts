import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  HttpStatus, 
  Param, 
  Post, 
  Put, 
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserService } from './user.service';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserlDto: CreateUserDto) {
    return this.userService.create(createUserlDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('listar')
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(
    @Param('id') id: number) {
    return this.userService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number, 
    @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }
 
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy( @Param('id') id: number){
    return await this.userService.destroy(id);
  }

}