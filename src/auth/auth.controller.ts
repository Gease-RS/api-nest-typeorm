import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(AuthGuard('local'))
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Req() req: any) {
        
        return this.authService.login(req.user);
   
    }
}
