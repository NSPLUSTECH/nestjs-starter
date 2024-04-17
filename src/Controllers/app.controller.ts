import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import LoginDTO from 'src/DTOs/Login.dto';
import UserDto from 'src/DTOs/User.dto';
import { AuthGuard, AuthService } from 'src/Services/Auth.Service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() login: LoginDTO) {
    return await this.authService.signIn(login.email, login.pass)
  }

  @Post('signup')
  async signup(@Body() user: UserDto) {
    return await this.authService.signup(user)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return "Hellow Authenticated"
  }
}
