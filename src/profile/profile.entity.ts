import { ApiProperty } from "@nestjs/swagger";
import {
    JoinColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToOne,
    BaseEntity,
    OneToMany
} from "typeorm"
import { User } from "../user/user.entity";
import Image from "../image/image.entity";

@Entity('profiles')
export default class Profile  extends BaseEntity{
    @ApiProperty({ description: 'Profile ID', example: 1 })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ description: 'Primeiro nome', example: 'Jhonny' })
    @Column()
    firstname: string

    @ApiProperty({ description: 'Sobrenome', example: 'Ramone' })
    @Column()
    lastname: string

    @ApiProperty({ description: 'Cargo', example: 'Motorista' })
    @Column()
    cargo: string

    @ApiProperty({ description: 'Bio', example: 'Motorista de Entregas' })
    @Column()
    bio: string

    @ApiProperty({ description: 'User ID', example: 1 })
    @Column()
    userId: number;

    @ApiProperty({ description: 'Usuário', example: 'jhonny' })
    @OneToOne(() => User, user => user.profile, { 
        cascade: true,
        eager: true
    })
    @JoinColumn({ name: 'userId' })
    user: User

}
