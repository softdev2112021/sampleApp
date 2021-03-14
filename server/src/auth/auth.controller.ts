import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../user/user.decorator';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserEntity) {
    return this.authService.login(user);
  }
}
