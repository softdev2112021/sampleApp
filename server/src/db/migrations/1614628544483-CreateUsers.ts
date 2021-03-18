import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { User } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';

export class CreateUsers1614628544483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository: Repository<User> = queryRunner.connection.getRepository(
      User,
    );

    interface UserData {
      name: string;
      login: string;
      password: string;
    }

    const usersData: UserData[] = [
      { name: 'user1', login: 'user1@gmail.com', password: 'pass1' },
      { name: 'user2', login: 'user2@gmail.com', password: 'pass2' },
      { name: 'user3', login: 'user3@gmail.com', password: 'pass3' },
    ];

    const users: User[] = await Promise.all(
      usersData.map(async (user: UserData) => {
        return userRepository.create({
          name: user.name,
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

    const users: User[] = await userRepository.find({
      select: ['login'],
    });

    if (!users.length) {
      return;
    }

    await userRepository.remove(users);
  }
}
