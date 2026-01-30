import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContactCompanyField1706500017000 implements MigrationInterface {
  name = 'AddContactCompanyField1706500017000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE contact_submissions ADD COLUMN company VARCHAR(255)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE contact_submissions DROP COLUMN company
    `);
  }
}
