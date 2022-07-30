import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import {
    Entity, 
} from "typeorm"

@Entity('images')
export class CreateImageDto {
    @ApiProperty({ description: 'Usuário ID', example: 1})
    @IsNotEmpty()
    userId: number;
}

