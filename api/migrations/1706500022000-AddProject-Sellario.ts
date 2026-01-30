import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectSellario1706500022000 implements MigrationInterface {
  name = 'AddProjectSellario1706500022000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "projects" (
        "title",
        "category",
        "tools",
        "image_url",
        "description",
        "sort_order",
        "featured"
      ) VALUES (
        'Sellario',
        'Full Stack',
        ARRAY['PHP', 'Yii2', 'PostgreSQL', 'React', 'TypeScript', 'Redux Toolkit', 'MUI']::varchar[],
        '/images/projects/sellario.jpeg',
        'Staffing/Sales CRM with quote management, billing, and real-time notifications all enhanced by an event-driven structure in the API.',
        0,
        true
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "projects" WHERE "title" = 'Sellario'`);
  }
}
