import { UserEntity } from '../../user/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private userRepository: Repository<UserEntity>;
  constructor(private jwtService: JwtService, private connection: Connection) {
    this.userRepository = this.connection.getRepository(UserEntity);
  }

  async validateUser(login: string, pass: string): Promise<UserEntity | null> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { login },
    });

    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
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
