import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectCatchOfTheDay1706500015000 implements MigrationInterface {
  name = 'AddProjectCatchOfTheDay1706500015000';

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
        'Catch of the Day',
        'Full Stack',
        ARRAY[]::varchar[],
        '/images/projects/catch-of-the-day.jpeg',
        3,
        true
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "projects" WHERE "title" = 'Catch of the Day'`);
  }
}
