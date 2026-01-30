import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectBigShot1706500014000 implements MigrationInterface {
  name = 'AddProjectBigShot1706500014000';

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
        'Big Shot',
        'Full Stack',
        ARRAY[]::varchar[],
        '/images/projects/big-shot.jpeg',
        2,
        true
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "projects" WHERE "title" = 'Big Shot'`);
  }
}
