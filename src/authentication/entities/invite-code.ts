import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('invite_codes')
export class InviteCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ default: false })
  used: boolean;

  @Column({ nullable: true })
  usedBy: string; // userId or email

  @Column({ nullable: true })
  expiresAt: Date | null;
}
