import { Injectable, Inject, ForbiddenException } from '@nestjs/common';
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
    const email = await this.userRepository.findOneBy({email: data.email});
    const usernameExists = await this.userRepository.findOneBy({username: data.username});

    if(email) {
      throw new Error('Este email já existe. Faça o login!');
    }

    if(usernameExists) {
      throw new Error('Este usuário já existe. Escolha outro!');
    }
    
    const newUser = await this.userRepository.create(
      {
        ...data,
        password: await bcrypt.hash(data.password, 10)
      }
    );

    await this.userRepository.save(newUser);

    return {
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      message: 'Usuário criado com sucesso!'
    }
  }

  async findAll(){
    return this.userRepository.find(
      {
        relations: ['images'],
        select: ['id', 'username', 'email', 'role', 'images']
      }
    );
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
    const user = await this.userRepository.findOneByOrFail({id});

    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    await this.userRepository.softDelete(id);

    return { message: 'Usuário deletado com Sucesso!' };
  }
}