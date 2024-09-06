import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class Aggregate<T> {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  private createdAt!: Date;

  @Column()
  private createdBy!: string;

  @UpdateDateColumn()
  private updatedAt!: Date;

  @Column()
  private updatedBy!: string;

  @DeleteDateColumn()
  private deletedAt!: Date;

  @Column({ nullable: true })
  private deletedBy!: string;

  setTxId(txId: string) {
    if (!this.createdBy) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }
}
