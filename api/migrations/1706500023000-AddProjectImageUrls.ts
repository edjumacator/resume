import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectImageUrls1706500023000 implements MigrationInterface {
  name = 'AddProjectImageUrls1706500023000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add image_urls array column
    await queryRunner.query(`
      ALTER TABLE "projects"
      ADD COLUMN "image_urls" character varying[] DEFAULT '{}'
    `);

    // Migrate existing image_url values into the array
    await queryRunner.query(`
      UPDATE "projects"
      SET "image_urls" = ARRAY["image_url"]
      WHERE "image_url" IS NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "image_urls"`);
  }
}
