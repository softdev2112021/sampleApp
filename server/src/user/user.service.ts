import { HttpException, HttpStatus, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getByLogin(login: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { login },
    });

    if (!user) {
      this.logger.log(`User with login ${login} not found`);
      throw new HttpException('User with this login does not exist', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
