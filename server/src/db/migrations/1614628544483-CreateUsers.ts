import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import * as bcrypt from 'bcrypt';

export class CreateUsers1614628544483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository: Repository<UserEntity> = queryRunner.connection.getRepository(
      UserEntity,
    );

    interface UserData {
      login: string;
      password: string;
    }

    const usersData: UserData[] = [
      { login: 'user1@gmail.com', password: 'pass1' },
      { login: 'user2@gmail.com', password: 'pass2' },
      { login: 'user3@gmail.com', password: 'pass3' },
    ];

    const users: UserEntity[] = await Promise.all(
      usersData.map(async (user: UserData) => {
        return userRepository.create({
          login: user.login,
          passwordHash: await bcrypt.hash(user.password, 10),
        });
      }),
    );

    await userRepository.manager.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository: Repository<UserEntity> = queryRunner.connection.getRepository(
      UserEntity,
    );

    const users: UserEntity[] = await userRepository.find({
      select: ['login'],
    });

    if (!users.length) {
      return;
    }

    await userRepository.remove(users);
  }
}
