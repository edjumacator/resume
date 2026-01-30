import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAltametricsProjects1706500016000 implements MigrationInterface {
  name = 'UpdateAltametricsProjects1706500016000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Update Lillypad
    await queryRunner.query(`
      UPDATE "projects"
      SET
        "description" = 'Mini-game for the Altametrics Brand Loyalty Application. Users earned loyalty points through gameplay that could be redeemed for coupons at participating businesses within the point-of-sale system.',
        "tools" = ARRAY['PHP', 'jQuery', 'JavaScript', 'MySQL'],
        "start_date" = 'March 2013',
        "end_date" = 'February 2014'
      WHERE "title" = 'Lillypad'
    `);

    // Update Big Shot
    await queryRunner.query(`
      UPDATE "projects"
      SET
        "description" = 'Mini-game for the Altametrics Brand Loyalty Application. Users earned loyalty points through gameplay that could be redeemed for coupons at participating businesses within the point-of-sale system.',
        "tools" = ARRAY['PHP', 'jQuery', 'JavaScript', 'MySQL'],
        "start_date" = 'March 2013',
        "end_date" = 'February 2014'
      WHERE "title" = 'Big Shot'
    `);

    // Update Catch of the Day
    await queryRunner.query(`
      UPDATE "projects"
      SET
        "description" = 'Mini-game for the Altametrics Brand Loyalty Application. Users earned loyalty points through gameplay that could be redeemed for coupons at participating businesses within the point-of-sale system.',
        "tools" = ARRAY['PHP', 'jQuery', 'JavaScript', 'MySQL'],
        "start_date" = 'March 2013',
        "end_date" = 'February 2014'
      WHERE "title" = 'Catch of the Day'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert to empty values
    await queryRunner.query(`
      UPDATE "projects"
      SET
        "description" = NULL,
        "tools" = ARRAY[]::varchar[],
        "start_date" = NULL,
        "end_date" = NULL
      WHERE "title" IN ('Lillypad', 'Big Shot', 'Catch of the Day')
    `);
  }
}
