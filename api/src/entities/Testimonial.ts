import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @Column({ type: 'varchar', length: 100 })
  role!: string;

  @Column({ type: 'varchar', length: 100 })
  company!: string;

  @Column({ type: 'varchar', length: 255, name: 'avatar_url' })
  avatarUrl!: string;

  @Column({ type: 'int' })
  rating!: number;

  @Column({ type: 'text' })
  quote!: string;

  @Column({ type: 'int', name: 'sort_order', default: 0 })
  sortOrder!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
