import { Service, Inject } from 'typedi';
import { badRequest, unauthorized } from '@hapi/boom';
import { User } from '../domain/model';
import { DddService } from '../../../libs/ddd';
import { UserRepository } from '../infrastructure/repository';
import { FilteredUserSpec } from '../domain/specs';

@Service()
export class UserService extends DddService {
  constructor(@Inject() private userRepository: UserRepository) {
    super();
  }

  async signIn({ email, password }: { email: string; password: string }) {
    const [user] = await this.userRepository.findSatisfying(new FilteredUserSpec({ email }));

    if (!user || !user.comparePassword(password)) {
      throw unauthorized('email or password is not correct.');
    }

    return user.getToken();
  }

  /**
   * @description 회원가입 API
   */
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
