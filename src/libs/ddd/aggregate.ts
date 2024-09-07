import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export abstract class Aggregate<T> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Exclude()
  @CreateDateColumn({ select: false })
  private createdAt!: Date;

  @Exclude()
  @Column({ select: false })
  private createdBy!: string;

  @Exclude()
  @UpdateDateColumn({ select: false })
  private updatedAt!: Date;

  @Exclude()
  @Column({ select: false })
  private updatedBy!: string;

  @Exclude()
  @DeleteDateColumn({ select: false })
  private deletedAt!: Date;

  @Exclude()
  @Column({ nullable: true, select: false })
  private deletedBy!: string;

  setTxId(txId: string) {
    if (!this.createdBy) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }
}
