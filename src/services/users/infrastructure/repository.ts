import { Service } from 'typedi';
import { DddRepository } from '../../../libs/ddd';
import { User } from '../domain/model';
import type { UserSpec } from '../domain/specs/user-spec';

@Service()
export class UserRepository extends DddRepository<User> {
  protected entityClass = User;

  async findSatisfying(spec: UserSpec) {
    return spec.satisfyingElementFrom(this);
  }

  async countSatisfying(spec: UserSpec) {
    return spec.satisfyingCountFrom(this);
  }

  async find({ email, username }: { email?: string; username?: string }) {
    return this.getManager.find(this.entityClass, {
      where: {
        email,
        username,
      },
    });
  }

  async count({ email, username }: { email?: string; username?: string }) {
    return this.getManager.count(this.entityClass, {
      where: {
        email,
        username,
      },
    });
  }
}
