import { UserRepository } from '../../infrastructure/repository';
import { User } from '../model';
import { UserSpec } from './user-spec';

export class FilteredUserSpec implements UserSpec {
  private username?: string;

  constructor({ username }: { username?: string }) {
    this.username = username;
  }

  async satisfyingElementFrom(userRepository: UserRepository): Promise<User[]> {
    return userRepository.find({ username: this.username });
  }

  async satisfyingCountFrom(userRepository: UserRepository): Promise<number> {
    return userRepository.count({ username: this.username });
  }
}
