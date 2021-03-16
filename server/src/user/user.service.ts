import { HttpException, HttpStatus, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getByLogin(login: string): Promise<UserEntity> {
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
