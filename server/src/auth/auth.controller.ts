import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Logger,
  LoggerService,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ReqUser } from '../user/user.decorator';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { CookieSettings } from './interfaces/cookieSettings.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @ReqUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    const { name, value, options }: CookieSettings = this.authService.login(
      user,
    );
    res.cookie(name, value, options);
    this.logger.log(`User ${user.id} has logged in`);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    const { name, options }: CookieSettings = this.authService.logout();
    this.logger.log(`User has logged out`);
    res.clearCookie(name, options);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@ReqUser() user: User): Promise<User> {
    this.logger.log(`User ${user.id} has logged profile in`);
    return user;
  }
}
