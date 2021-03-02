import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { User } from '../../user.entity';
import * as bcrypt from 'bcrypt';

export class CreateUsers1614628544483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository: Repository<User> = queryRunner.connection.getRepository(
      User,
    );

    interface userData {
      login: string;
      password: string;
    }
    const usersData: userData[] = [
      { login: 'user1', password: 'pass1' },
      { login: 'user2', password: 'pass2' },
      { login: 'user3', password: 'pass3' },
    ];

    const users: User[] = await Promise.all(
      usersData.map(async (user: userData) => {
        return userRepository.create({
          login: user.login,
          passwordHash: await bcrypt.hash(user.password, 10),
        });
      }),
    );

    await userRepository.manager.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository: Repository<User> = queryRunner.connection.getRepository(
      User,
    );

    const users: User[] = await userRepository.find({ select: ['login'] });

    if (!users.length) {
      return;
    }

    await userRepository.remove(users);
  }
}
