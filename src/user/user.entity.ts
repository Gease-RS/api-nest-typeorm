import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  Index,
  DeleteDateColumn,
  BaseEntity,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import Profile from '../profile/profile.entity';
import Image from '../image/image.entity';

export enum Role {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  USER = 'user',
  ASSISTENT = 'assistente',
}

@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @ApiProperty({ description: 'User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Username', example: 'jhonny' })
  @Index()
  @Column({ length: 100 })
  username: string;

  @ApiProperty({ description: 'E-mail' })
  @Index()
  @Column({ length: 100 })
  email: string;

  @ApiProperty({ description: 'Senha', example: '@Minhasenha23' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Tipo de usuário', example: 'assistente' })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @ApiProperty({ description: 'Data de criação' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data de atualização' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'Data de exclusão' })
  @DeleteDateColumn()
  deletedAt: string;

  @ApiProperty({ description: 'Perfil' })
  @OneToOne(() => Profile, profile => profile.user)
  profile: Profile;

  @ApiProperty({ description: 'Foto de perfil' })
  @OneToMany(() => Image, (images) => images.user)
  @JoinColumn()
  images: Image[];
}
