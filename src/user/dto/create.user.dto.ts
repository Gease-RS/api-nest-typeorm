import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { MessageHelper } from "../../helpers/message.helper";
import { RegExHelper } from "../../helpers/regex.helper";
import { Role } from "../user.entity";


export class CreateUserDto {
    @ApiProperty({ description: 'Username', example: 'jhonny' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'E-mail',  example: 'jhonny@jhonny.com.br'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(RegExHelper.PASSWORD, { message: MessageHelper.PASSWORD_OR_EMAIL_INVALID })
    password: string;

    @ApiProperty({ description: 'Tipo de usuário', example: 'assistente', default: "assitente", })
    @IsNotEmpty()
    role: (Role);

}