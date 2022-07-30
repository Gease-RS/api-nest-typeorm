import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import Profile from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('PROFILE_REPOSITORY')
    private profileRepository: Repository<Profile>,
  ) {}

  async create(data: CreateProfileDto) {
    return await this.profileRepository.save(data);
  }

  async findAll() {
    return await this.profileRepository.find();
  }

  async findOneBy(id: number) {
    return await this.profileRepository.findOneBy({ id });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    return await this.profileRepository.update(id, updateProfileDto);
  }
}
