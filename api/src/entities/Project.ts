import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'varchar', length: 50 })
  category!: string;

  @Column({ type: 'varchar', array: true })
  tools!: string[];

  @Column({ type: 'varchar', length: 255, name: 'image_url' })
  imageUrl!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link!: string | null;

  @Column({ type: 'int', name: 'sort_order', default: 0 })
  sortOrder!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
