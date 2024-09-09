import { UserRepository } from '../../infrastructure/repository';
import { User } from '../model';
import { UserSpec } from './user-spec';

export class FilteredUserSpec implements UserSpec {
  private id?: User['id'];

  private email?: string;

  private username?: string;

  constructor({ id, email, username }: { id?: User['id']; email?: string; username?: string }) {
    this.id = id;
    this.email = email;
    this.username = username;
  }

  async satisfyingElementFrom(userRepository: UserRepository): Promise<User[]> {
    return userRepository.find({ id: this.id, email: this.email, username: this.username });
  }

  async satisfyingCountFrom(userRepository: UserRepository): Promise<number> {
    return userRepository.count({ id: this.id, email: this.email, username: this.username });
  }
}
