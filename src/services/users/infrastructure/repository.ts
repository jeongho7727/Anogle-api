import { Service } from 'typedi';
import { DddRepository } from '../../../libs/ddd';
import { User } from '../domain/model';

@Service()
export class UserRepository extends DddRepository<User> {
  entityClass = User;
}
