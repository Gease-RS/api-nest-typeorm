import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { User } from './user.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    return this.userRepository.save({
      ...data,
      password: bcrypt.hashSync(data.password, 10)
    });
  }

  async findAll(){
    return this.userRepository.find();
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({id});
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({email});
  }

  async update(id:number, data: UpdateUserDto) {
    const user = await this.userRepository.findOneByOrFail({id});
    this.userRepository.merge(user, data);
    return await this.userRepository.save(user);
  }

  async destroy(id: number) {
    await this.userRepository.findOneByOrFail({id});
    return this.userRepository.softDelete(id);
  }
}