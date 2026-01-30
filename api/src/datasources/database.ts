import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Service } from '../entities/Service.js';
import { Experience } from '../entities/Experience.js';
import { Skill } from '../entities/Skill.js';
import { Project } from '../entities/Project.js';
import { Testimonial } from '../entities/Testimonial.js';
import { ContactSubmission } from '../entities/ContactSubmission.js';
import { SkillCategory } from '../entities/SkillCategory.js';

config();

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'resume',
  password: process.env.DB_PASSWORD || 'resume_password',
  database: process.env.DB_DATABASE || 'resume_db',
  synchronize: false,
  logging: !isProduction,
  entities: [Service, Experience, Skill, Project, Testimonial, ContactSubmission, SkillCategory],
  // Migrations are only needed for migration:run command, not for API runtime
  // The migrations container runs with NODE_ENV=development to use ts-node
  migrations: isProduction ? [] : ['migrations/*.ts'],
});
