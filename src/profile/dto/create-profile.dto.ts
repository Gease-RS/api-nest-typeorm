import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import {
    Entity, 
} from "typeorm"
import { User } from "../../user/user.entity";


@Entity('profiles')
export class CreateProfileDto {
    @ApiProperty({ description: 'Primeiro nome', example: 'Jhonny' })
    @IsNotEmpty()
    firstname: string

    @ApiProperty({ description: 'Sobrenome', example: 'Ramone' })
    @IsNotEmpty()
    lastname: string

    @ApiProperty({ description: 'Cargo', example: 'Motorista' })
    @IsNotEmpty()
    cargo: string

    @ApiProperty({ description: 'Bio', example: 'Motorista de Entregas' })
    @IsNotEmpty()
    bio: string

    @ApiProperty({ description: 'User ID', example: 1 })
    @IsNotEmpty()
    userId: number
}

