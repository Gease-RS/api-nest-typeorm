import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, Index, BeforeInsert, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcrypt';

export enum Role {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    USER = "user",
    ASSISTENT = "assistente",
  }

@Entity()
@Unique(["username", "email"])
export class User {
  @ApiProperty({ description: 'User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Username', example: 'jhonny' })
  @Index()
  @Column({ length: 100 })
  username: string;

  @ApiProperty({ description: 'E-mail'})
  @Index()
  @Column({ length: 100 })
  email: string;

  @ApiProperty({ description: 'Senha', example: '@Minhasenha23' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Tipo de usuário', example: 'assistente' })
  @Column({
    type: "enum",
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

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
    return this;
  }

}