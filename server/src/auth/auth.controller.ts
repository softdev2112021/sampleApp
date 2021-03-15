import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { CookieSettings } from './interfaces/cookieSettings.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @User() user: UserEntity,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserEntity> {
    const { name, value, options }: CookieSettings = this.authService.login(user);
    res.cookie(name, value, options);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    const { name, options }: CookieSettings = this.authService.logout();
    res.clearCookie(name, options);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
