import { Inject, Service } from 'typedi';
import { DddService } from '../../../libs/ddd';

@Service()
export class AttendanceService extends DddService {
  constructor(@Inject() private attendanceRepository: AttendanceService) {
    super();
  }

  async register() {}
}
