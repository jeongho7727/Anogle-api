import { Service, Inject } from 'typedi';
import { DddContext } from '../../../libs/ddd';
import { DddService } from '../../../libs/ddd/service';

@Service()
export class UserService extends DddService {
  signup() {
    return 'hi입니다.';
  }
}
