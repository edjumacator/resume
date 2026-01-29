import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExperienceSkills1706500001000 implements MigrationInterface {
  name = 'AddExperienceSkills1706500001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add skills column to experiences table
    await queryRunner.query(`
      ALTER TABLE "experiences" ADD COLUMN "skills" character varying[] NOT NULL DEFAULT '{}'
    `);

    // Update experiences with relevant skills
    await queryRunner.query(`
      UPDATE "experiences"
      SET "skills" = ARRAY['Figma', 'UI/UX Design', 'User Research', 'Prototyping', 'Design Systems', 'Webflow']
      WHERE "role" = 'Freelance UI/UX Designer'
    `);

    await queryRunner.query(`
      UPDATE "experiences"
      SET "skills" = ARRAY['Product Design', 'Data Visualization', 'D3.js', 'Design Leadership', 'User Testing', 'Agile']
      WHERE "role" = 'Senior Product Designer'
    `);

    await queryRunner.query(`
      UPDATE "experiences"
      SET "skills" = ARRAY['Sketch', 'Adobe XD', 'HTML/CSS', 'Responsive Design', 'Mobile UI', 'Wireframing']
      WHERE "role" = 'UI Designer'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "experiences" DROP COLUMN "skills"`);
  }
}
