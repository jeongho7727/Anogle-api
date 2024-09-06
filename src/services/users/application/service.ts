import { Service, Inject } from 'typedi';
import { User } from '../domain/model';
import { DddService } from '../../../libs/ddd';
import { UserRepository } from '../infrastructure/repository';

@Service()
export class UserService extends DddService {
  constructor(@Inject() private userRepository: UserRepository) {
    super();
  }

  async signup({ username, password }: { username: string; password: string }) {
    const user = User.of({ username, password });

    await this.userRepository.save([user]);
  }
}
