import { Column, Entity } from 'typeorm';
import { badRequest } from '@hapi/boom';
import { sign } from 'jsonwebtoken';
import { createHash } from 'crypto';
import { Aggregate } from '../../../libs/ddd';
import { docs } from '../../../config';

type Creator = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

@Entity()
export class User extends Aggregate<User> {
  @Column({ unique: true })
  email!: string;

  @Column()
  username!: string;

  @Column()
  private password!: string;

  private constructor(args: Omit<Creator, 'confirmPassword'>) {
    super();
    if (args) {
      this.email = args.email;
      this.username = args.username;
      this.password = this.getHashedPassword(args.password);
    }
  }

  static of(args: Creator) {
    if (args.password !== args.confirmPassword) {
      throw badRequest('password and confirmPassword is not same.', {
        message: 'password and confirmPassword is not same.',
      });
    }
    return new User(args);
  }

  private getHashedPassword(password: string) {
    return createHash('sha256').update(password).digest('hex');
  }

  comparePassword(plainPassword: string) {
    return this.password === this.getHashedPassword(plainPassword);
  }

  getToken() {
    return sign(
      {
        userId: this.id,
      },
      docs.jwtSecret
    );
  }
}
