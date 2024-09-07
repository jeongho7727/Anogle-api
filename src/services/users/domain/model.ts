import { Column, Entity } from 'typeorm';
import { createHash } from 'crypto';
import { Aggregate } from '../../../libs/ddd';
import { badRequest } from '@hapi/boom';

type Creator = {
  username: string;
  password: string;
  confirmPassword: string;
};

@Entity()
export class User extends Aggregate<User> {
  @Column()
  username!: string;

  @Column({ select: false })
  private password!: string;

  private constructor(args: Creator) {
    super();
    if (args) {
      if (args.password !== args.confirmPassword) {
        throw badRequest('password and confirmPassword is not same.', {
          message: 'password and confirmPassword is not same.',
        });
      }
      this.username = args.username;
      this.password = this.getHashedPassword(args.password);
    }
  }

  static of(args: Creator) {
    return new User(args);
  }

  private getHashedPassword(password: string) {
    return createHash('sha256').update(password).digest('hex');
  }

  private comparePassword(plainPassword: string) {
    return this.password === this.getHashedPassword(plainPassword);
  }
}
