import type { UserRepository } from '../../infrastructure/repository';
import type { User } from '../model';

export abstract class UserSpec {
  abstract satisfyingElementFrom(userRepository: UserRepository): Promise<User[]>;

  abstract satisfyingCountFrom(userRepository: UserRepository): Promise<number>;
}
