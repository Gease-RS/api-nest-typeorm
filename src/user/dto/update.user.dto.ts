import { IsNotEmpty, Matches } from "class-validator";
import { Role } from "../user.entity";


export class UpdateUserDto {

    @IsNotEmpty()
    role: (Role);

}