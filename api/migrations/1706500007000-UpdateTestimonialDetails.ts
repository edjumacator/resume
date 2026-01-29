import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Update Testimonial Details Migration
 *
 * Corrects job titles and companies for testimonials that were
 * incorrectly associated based on when the recommendation was left.
 */

interface TestimonialUpdate {
  name: string;
  newRole: string;
  newCompany: string;
  oldRole: string;
  oldCompany: string;
}

const UPDATES: TestimonialUpdate[] = [
  {
    name: 'David Huynh',
    newRole: 'Software Engineer',
    newCompany: 'Altametrics',
    oldRole: 'Software Engineering Manager',
    oldCompany: 'Vizient, Inc',
  },
  {
    name: 'Nandya Thio',
    newRole: 'Sr. UX Graphic Designer',
    newCompany: 'Vizient, Inc',
    oldRole: 'Sr. UX Designer',
    oldCompany: "Lowe's Companies, Inc.",
  },
  {
    name: 'Misty White',
    newRole: 'Owner/Operator',
    newCompany: 'LaborMax Staffing',
    oldRole: 'Operations Manager',
    oldCompany: 'Aquent',
  },
];

export class UpdateTestimonialDetails1706500007000 implements MigrationInterface {
  name = 'UpdateTestimonialDetails1706500007000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const update of UPDATES) {
      await queryRunner.query(
        `UPDATE "testimonials" SET "role" = $1, "company" = $2 WHERE "name" = $3`,
        [update.newRole, update.newCompany, update.name]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const update of UPDATES) {
      await queryRunner.query(
        `UPDATE "testimonials" SET "role" = $1, "company" = $2 WHERE "name" = $3`,
        [update.oldRole, update.oldCompany, update.name]
      );
    }
  }
}
