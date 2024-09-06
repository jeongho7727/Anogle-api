import { Column, Entity } from 'typeorm';
import { Aggregate } from '../../../libs/ddd';

type Creator = {
  username: string;
  password: string;
};

@Entity()
export class User extends Aggregate<User> {
  @Column()
  username!: string;

  @Column()
  password!: string;

  private constructor(args: Creator) {
    super();
    if (args) {
      this.username = args.username;
      this.password = args.password;
    }
  }

  static of(args: Creator) {
    return new User(args);
  }
}
