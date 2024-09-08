import { Entity, Column } from 'typeorm';
import { Aggregate } from '../../../libs/ddd';

type Creator = {
  location: string;
  startTime: string;
  endTime: string;
  userId: string;
};

@Entity()
export class Attendance extends Aggregate<Attendance> {
  @Column()
  location!: string;

  @Column()
  startTime!: string;

  @Column({ nullable: true })
  endTime!: string;

  @Column()
  userId!: string;

  constructor(args: Creator) {
    super();
    if (args) {
      this.location = args.location;
      this.startTime = args.startTime;
      this.endTime = args.endTime;
      this.userId = args.userId;
    }
  }
}
