import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Experience } from './Experience.js';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 50 })
  category!: string;

  @ManyToMany(() => Experience, (experience) => experience.skillEntities)
  experiences!: Experience[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
