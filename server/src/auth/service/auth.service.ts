import { UserEntity } from '../../user/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SecureUser } from './interfaces/secureUser.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(login: string, pass: string): Promise<SecureUser | null> {
    const user: UserEntity = await this.userService.getUserByLogin(login);

    const comparison = await bcrypt.compare(pass, user.passwordHash);

    if (user && comparison) {
      const { passwordHash, ...secureUser } = user;
      return secureUser;
    }

    return null;
  }

  async login(user: UserEntity): Promise<{ accessToken: string }> {
    const payload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
