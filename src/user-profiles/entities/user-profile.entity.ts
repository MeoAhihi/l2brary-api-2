import { Exclude, Expose } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column()
  @Expose()
  fullName: string;

  @Column()
  @Expose()
  internationalName: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  @Expose()
  gender: Gender;

  @Column({ type: 'date' })
  @Expose()
  birthdate: Date;

  @Column()
  @Expose()
  phoneNumber: string;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Expose()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Expose()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  deletedAt: Date;
}
