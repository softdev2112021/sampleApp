import { User } from '../user/user.entity';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { CookieSettings } from './interfaces/cookieSettings.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(login: string, pass: string): Promise<User | null> {
    const user: User = await this.userService.getByLogin(login);

    const comparison = await bcrypt.compare(pass, user.passwordHash);

    if (user && comparison) {
      this.logger.log(`User ${user.id} password validated`);
      return user;
    }

    this.logger.log(`User ${user.id} password denied`);
    return null;
  }

  public login(user: User): CookieSettings {
    const payload: { login: string } = { login: user.login };
    const token = this.jwtService.sign(payload);
    const maxAge = parseInt(this.configService.get('JWT_EXPIRES_IN')) * 1000 * 3600;

    return {
      name: 'Authentication',
      value: token,
      options: {
        maxAge,
        path: '/',
        httpOnly: true,
      },
    };
  }

  public logout(): CookieSettings {
    return {
      name: 'Authentication',
      options: {
        maxAge: 0,
        path: '/',
        httpOnly: true,
      },
    };
  }
}
