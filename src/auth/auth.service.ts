import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

      async login(user: User) {
        const payload = {
          email: user.email,
          sub: user.id,
        };
        return {
          messsage: 'Logado com sucesso!',
          access_token: this.jwtService.sign(payload)
        };
      }
    
      async validateUser(email: string, password: string) {
        let user: User;
        try {
          user = await this.userService.findOneByEmail(email);
        } catch (error) {
          return null;
        }
    
        const isPasswordValid = compareSync(password, user.password);
        if (!isPasswordValid) return null;
    
        return user;
      }
    }

