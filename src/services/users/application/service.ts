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
    email,
    username,
    password,
    confirmPassword,
  }: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) {
    const [isExistedUser] = await this.userRepository.findSatisfying(
      new FilteredUserSpec({ email })
    );
    if (isExistedUser) {
      throw badRequest(`${email} is already existed.`, {
        message: `${email} is already existed.`,
      });
    }

    const user = User.of({ email, username, password, confirmPassword });

    await this.userRepository.save([user]);
  }
}
