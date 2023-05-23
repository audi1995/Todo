import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) { }

  @Post('/login')
  @UseGuards(AuthGuard("local"))

  login(@Req() req) {
    const user: User = req.user;
    const payload = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    }

    return { token: this.jwtService.sign(payload) };
  }

}