import { UserRepository } from '../../infrastructure/repository';
import { User } from '../model';
import { UserSpec } from './user-spec';

export class FilteredUserSpec implements UserSpec {
  private email?: string;

  private username?: string;

  constructor({ email, username }: { email?: string; username?: string }) {
    this.email = email;
    this.username = username;
  }

  async satisfyingElementFrom(userRepository: UserRepository): Promise<User[]> {
    return userRepository.find({ email: this.email, username: this.username });
  }

  async satisfyingCountFrom(userRepository: UserRepository): Promise<number> {
    return userRepository.count({ email: this.email, username: this.username });
  }
}
