import { ApiProperty } from "@nestjs/swagger";
import {
    JoinColumn, 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    BaseEntity,
    ManyToOne,
    UpdateDateColumn
} from "typeorm"
import { User } from "../user/user.entity";

@Entity('images')
export default class Image  extends BaseEntity{
    @ApiProperty({ description: 'Profile ID', example: 1 })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ description: 'Primeiro nome', example: 'Jhonny' })
    @Column()
    url: string

    @ApiProperty({ description: 'Criado em:', example: '2022-02-02' })
    @UpdateDateColumn()
    createdAt: Date;
  
    @ApiProperty({ description: 'Usuário ID', example: 1 })
    @Column()
    userId: number;

    @ApiProperty({ description: 'Relations Images' })
    @ManyToOne(() => User, (user) => user.images, { 
        cascade: true,
        eager: true
    })
    @JoinColumn({ name: 'userId' })
    user: User

}
