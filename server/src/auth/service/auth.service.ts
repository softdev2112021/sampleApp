import { UserEntity } from '../../user/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SecureUser } from './interfaces/secureUser.interface';

@Injectable()
export class AuthService {
  private userRepository: Repository<UserEntity>;
  constructor(
    private readonly jwtService: JwtService,
    private readonly connection: Connection,
  ) {
    this.userRepository = this.connection.getRepository(UserEntity);
  }

  async validateUser(login: string, pass: string): Promise<SecureUser | null> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { login },
    });

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
