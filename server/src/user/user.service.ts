import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserByLogin(login: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { login },
    });
  }

  async getUserRepository() {
    return this.userRepository;
  }
}
