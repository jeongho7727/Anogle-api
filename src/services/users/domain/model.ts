import { Column, Entity } from 'typeorm';
import { Aggregate } from '../../../libs/ddd';

@Entity()
export class User extends Aggregate<User> {
  @Column()
  username!: string;

  @Column()
  password!: string;

  constructor(args: { username: string; password: string }) {
    super();

    if (args) {
      this.username = args.username;
      this.password = args.password;
    }
  }
}
