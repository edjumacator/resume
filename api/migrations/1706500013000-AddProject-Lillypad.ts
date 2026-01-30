import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectLillypad1706500013000 implements MigrationInterface {
  name = 'AddProjectLillypad1706500013000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "projects" (
        "title",
        "category",
        "tools",
        "image_url",
        "sort_order",
        "featured"
      ) VALUES (
        'Lillypad',
        'Full Stack',
        ARRAY[]::varchar[],
        '/images/projects/lillypad.jpeg',
        1,
        true
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "projects" WHERE "title" = 'Lillypad'`);
  }
}
