import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from '../services/AuthService';
import { AuthDto } from '../dtos/AuthDto';
import { LocalGuard } from '../../security/LocalGuard';
import { JwtGuard } from '../../security/JwtGuard';


@Controller('/auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @Post('/signup')
  async signUp (@Body() body: AuthDto) {
    return this.authService.signUp(body);
  }

  @Post('/login')
  @UseGuards(LocalGuard)
  async login (@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('/getMe')
  async getMe (@Request() req) {
    return req.user;
  }
}