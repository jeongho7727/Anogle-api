import { Service } from 'typedi';
import { DddRepository } from '../../../libs/ddd/repository';
import { User } from '../domain/model';
import { ObjectType } from 'typeorm';

@Service()
export class UserRepository extends DddRepository<User, number> {
  entityClass = User;

  async save(users: User[]) {
    await this.entityManager.save(users);
  }
}
