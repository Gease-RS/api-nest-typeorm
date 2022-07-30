import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @ApiProperty({ description: 'Primeiro nome', example: 'Jhonny' })
    firstname: string

    @ApiProperty({ description: 'Sobrenome', example: 'Ramone' })
    lastname: string

    @ApiProperty({ description: 'Cargo', example: 'Motorista' })
    cargo: string

    @ApiProperty({ description: 'Bio', example: 'Motorista de Entregas' })
    bio: string
}
