import { Inject, Service } from 'typedi';
import { DddService } from '../../../libs/ddd';
import { AttendanceRepository } from '../infrastructure/repository';

@Service()
export class AttendanceService extends DddService {
  constructor(@Inject() private attendanceRepository: AttendanceRepository) {
    super();
  }

  async register() {
    // await this.attendanceRepository.save()
  }
}
