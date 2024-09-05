import { Column, Entity } from 'typeorm';
import { Aggregate } from '../../../libs/ddd';

@Entity()
export class User extends Aggregate {
  @Column()
  username!: string;

  @Column()
  password!: string;
}
