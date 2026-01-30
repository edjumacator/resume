import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('contact_submissions')
export class ContactSubmission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  company?: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'boolean', name: 'privacy_accepted' })
  privacyAccepted!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
