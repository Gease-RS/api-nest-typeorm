import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { CreateImageDto } from './create-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {
    @ApiProperty({ description: 'Primeiro nome', example: 'Jhonny' })
    url: string
}
