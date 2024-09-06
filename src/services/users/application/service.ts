import { Service, Inject } from 'typedi';
import { User } from '../domain/model';
import { DddService } from '../../../libs/ddd';
import { UserRepository } from '../infrastructure/repository';

@Service()
export class UserService extends DddService {
  constructor(@Inject() private userRepository: UserRepository) {
    super();
  }

  async add() {
    const user = new User({ username: 'theo', password: '1234' });

    await this.userRepository.save([user]);
  }
}
