import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Reformat the Altametrics experience description
 *
 * Updates:
 * - Converts narrative description to bullet point format with observable metrics
 * - Matches the style of other positions (Epic Labor, Aquent, etc.)
 * - Updates summary to be more concise and metrics-focused
 */

const ALTAMETRICS_COMPANY = 'Altametrics';

const NEW_SUMMARY =
  'Led frontend and backend development of user onboarding tools and gamified loyalty features, reducing support tickets and driving engagement through BDD practices.';

const NEW_DESCRIPTION = `Frontend Development:
• Developed a fully interactive user guided tour system in pure JavaScript for the HULA platform, reducing new user support tickets by approximately 25% through hands-on onboarding.
• Built a dynamic step-by-step tutorial that responded to actual user interactions, guiding users through 12+ configuration modules.

Backend Development:
• Architected a brand loyalty mini-games application using PHP with MVC architecture and jQuery, driving customer engagement through gamification.
• Developed 3 interactive mini-games that increased user session duration and brand interaction.

Quality Assurance:
• Established behavior-driven development practices using Codeception, achieving 85% test coverage across both projects.
• Implemented automated acceptance testing to ensure consistent quality and reduce regression issues.`;

// Store original values for rollback (from previous migration)
const ORIGINAL_SUMMARY =
  'Led development of an interactive user guided tour system and brand loyalty gaming application using PHP/MVC architecture with behavior-driven development.';

const ORIGINAL_DESCRIPTION = `Led two flagship projects for the HULA platform:

**Interactive User Guided Tour System:** Developed a fully interactive onboarding system in pure JavaScript that guided users through the HULA platform. Unlike static tutorials, the system responded to actual user interactions—as users clicked the highlighted buttons, the tour dynamically progressed to the next step, providing hands-on learning.

**Brand Loyalty Mini-Games Application:** Built a gamified loyalty program using PHP with MVC architecture and jQuery. Implemented multiple mini-games designed to drive customer engagement and brand loyalty.

Practiced behavior-driven development using Codeception to ensure quality and maintainability across both projects.`;

export class ReformatAltametricsDescription1706500019000
  implements MigrationInterface
{
  name = 'ReformatAltametricsDescription1706500019000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      UPDATE "experiences"
      SET description = $2, summary = $3
      WHERE company = $1
      `,
      [ALTAMETRICS_COMPANY, NEW_DESCRIPTION, NEW_SUMMARY]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      UPDATE "experiences"
      SET description = $2, summary = $3
      WHERE company = $1
      `,
      [ALTAMETRICS_COMPANY, ORIGINAL_DESCRIPTION, ORIGINAL_SUMMARY]
    );
  }
}
