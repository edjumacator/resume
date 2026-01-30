import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSkillCategories1706500020000 implements MigrationInterface {
  name = 'AddSkillCategories1706500020000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create skill_categories table
    await queryRunner.query(`
      CREATE TABLE "skill_categories" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" varchar(50) UNIQUE NOT NULL,
        "proficiency" decimal(3,1) NOT NULL CHECK ("proficiency" >= 0 AND "proficiency" <= 9.5),
        "sort_order" int NOT NULL DEFAULT 0,
        "color" varchar(20),
        "created_at" TIMESTAMP DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now()
      )
    `);

    // Seed initial skill categories with proficiency ratings
    const categories = [
      { name: 'DevOps', proficiency: 8.5, sortOrder: 1, color: '#10B981' },
      { name: 'Back-end', proficiency: 9.0, sortOrder: 2, color: '#3B82F6' },
      { name: 'Front-end', proficiency: 8.0, sortOrder: 3, color: '#F59E0B' },
      { name: 'Design', proficiency: 6.5, sortOrder: 4, color: '#EC4899' },
      { name: 'Security', proficiency: 7.5, sortOrder: 5, color: '#8B5CF6' },
    ];

    for (const cat of categories) {
      await queryRunner.query(
        `INSERT INTO "skill_categories" ("name", "proficiency", "sort_order", "color") VALUES ($1, $2, $3, $4)`,
        [cat.name, cat.proficiency, cat.sortOrder, cat.color]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "skill_categories"`);
  }
}
