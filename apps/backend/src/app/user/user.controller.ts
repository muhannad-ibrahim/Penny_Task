import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user') // Base URL for user routes will be /user
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup') // POST /user/signup
  async signup(@Body() signupDto: { email: string; password: string }) {
    const newUser = await this.userService.signup(signupDto.email, signupDto.password);
    if (newUser === null) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return { message: 'User successfully registered', user: newUser };
  }

  @Post('login') // POST /user/login
  async login(@Body() loginDto: { email: string; password: string }) {
    const token = await this.userService.login(loginDto.email, loginDto.password);
    if (token) {
      return token;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }
}
