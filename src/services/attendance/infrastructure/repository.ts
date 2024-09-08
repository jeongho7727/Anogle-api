import { Service } from 'typedi';
import { DddRepository } from '../../../libs/ddd';
import { Attendance } from '../domain/model';

@Service()
export class AttendanceRepository extends DddRepository<Attendance> {
  entityClass = Attendance;
}
