import { Service, Inject } from 'typedi';
import { badRequest } from '@hapi/boom';
import { User } from '../domain/model';
import { DddService } from '../../../libs/ddd';
import { UserRepository } from '../infrastructure/repository';
import { FilteredUserSpec } from '../domain/specs';

@Service()
export class UserService extends DddService {
  constructor(@Inject() private userRepository: UserRepository) {
    super();
  }

  async signup({
    username,
    password,
    confirmPassword,
  }: {
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    const [isExistedUser] = await this.userRepository.findSatisfying(
      new FilteredUserSpec({ username })
    );
    if (isExistedUser) {
      throw badRequest(`${username} is already existed.`, {
        message: `${username} is already existed.`,
      });
    }

    const user = User.of({ username, password, confirmPassword });

    await this.userRepository.save([user]);
  }
}
