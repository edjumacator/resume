import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExtendProjectsSchema1706500011000 implements MigrationInterface {
  name = 'ExtendProjectsSchema1706500011000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add description column
    await queryRunner.query(`
      ALTER TABLE "projects"
      ADD COLUMN "description" text
    `);

    // Add github_url column
    await queryRunner.query(`
      ALTER TABLE "projects"
      ADD COLUMN "github_url" character varying(255)
    `);

    // Add demo_url column
    await queryRunner.query(`
      ALTER TABLE "projects"
      ADD COLUMN "demo_url" character varying(255)
    `);

    // Add featured column with default false
    await queryRunner.query(`
      ALTER TABLE "projects"
      ADD COLUMN "featured" boolean NOT NULL DEFAULT false
    `);

    // Add start_date column
    await queryRunner.query(`
      ALTER TABLE "projects"
      ADD COLUMN "start_date" character varying(20)
    `);

    // Add end_date column
    await queryRunner.query(`
      ALTER TABLE "projects"
      ADD COLUMN "end_date" character varying(20)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "end_date"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "start_date"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "featured"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "demo_url"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "github_url"`);
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "description"`);
  }
}
