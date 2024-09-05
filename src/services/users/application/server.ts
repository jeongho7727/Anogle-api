import { Inject, Service } from 'typedi';
import { User } from '../domain/model';
import { DddService } from '../../../libs/ddd/service';
import { UserRepository } from '../infrastructure/repository';

@Service()
export class UserService extends DddService {
  constructor(@Inject() private userRepository: UserRepository) {
    super();
  }

  async signup() {
    const user = new User({ username: 'theo', password: '1234' });
    await this.userRepository.save([user]);
  }
}
