import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Revamp the Altametrics experience entry
 *
 * Updates:
 * - Enhanced description with details about the interactive tour system and mini-games
 * - Updated summary
 * - Add skills: jQuery (new), MySQL (existing), BDD (existing)
 * - Remove skills: PostgreSQL, Mobile Applications, Databases
 */

const ALTAMETRICS_COMPANY = 'Altametrics';

const NEW_SUMMARY =
  'Led development of an interactive user guided tour system and brand loyalty gaming application using PHP/MVC architecture with behavior-driven development.';

const NEW_DESCRIPTION = `Led two flagship projects for the HULA platform:

**Interactive User Guided Tour System:** Developed a fully interactive onboarding system in pure JavaScript that guided users through the HULA platform. Unlike static tutorials, the system responded to actual user interactions—as users clicked the highlighted buttons, the tour dynamically progressed to the next step, providing hands-on learning.

**Brand Loyalty Mini-Games Application:** Built a gamified loyalty program using PHP with MVC architecture and jQuery. Implemented multiple mini-games designed to drive customer engagement and brand loyalty.

Practiced behavior-driven development using Codeception to ensure quality and maintainability across both projects.`;

// New skill to add
const NEW_SKILLS: Array<{ name: string; category: string }> = [
  { name: 'jQuery', category: 'Frontend' },
];

// Skills to link (new + existing)
const SKILLS_TO_ADD = ['jQuery', 'MySQL', 'BDD'];

// Skills to remove
const SKILLS_TO_REMOVE = ['PostgreSQL', 'Mobile Applications', 'Databases'];

// Store original values for rollback
const ORIGINAL_SUMMARY =
  'Led development of a user guided tour system and brand loyalty application.';

const ORIGINAL_DESCRIPTION = `I was tasked with leading two primary projects:

User Guided Tour System:
This product helped users familiarize themselves with the HULA system as well as the various settings required to configure it.

A Brand Loyalty Application driven by a series of mini-games.`;

export class RevampAltametricsExperience1706500018000
  implements MigrationInterface
{
  name = 'RevampAltametricsExperience1706500018000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Update experience description and summary
    await queryRunner.query(
      `
      UPDATE "experiences"
      SET description = $2, summary = $3
      WHERE company = $1
      `,
      [ALTAMETRICS_COMPANY, NEW_DESCRIPTION, NEW_SUMMARY]
    );

    // Step 2: Insert new skills (ON CONFLICT DO NOTHING for idempotency)
    for (const { name, category } of NEW_SKILLS) {
      await queryRunner.query(
        `INSERT INTO "skills" ("name", "category") VALUES ($1, $2) ON CONFLICT (name) DO NOTHING`,
        [name, category]
      );
    }

    // Step 3: Link new skills to Altametrics experience
    const addPlaceholders = SKILLS_TO_ADD.map((_, i) => `$${i + 2}`).join(', ');
    await queryRunner.query(
      `
      INSERT INTO "experience_skills" ("experience_id", "skill_id")
      SELECT e.id, s.id
      FROM "experiences" e
      CROSS JOIN "skills" s
      WHERE e.company = $1
        AND s.name IN (${addPlaceholders})
      ON CONFLICT DO NOTHING
      `,
      [ALTAMETRICS_COMPANY, ...SKILLS_TO_ADD]
    );

    // Step 4: Remove old skill associations
    const removePlaceholders = SKILLS_TO_REMOVE.map(
      (_, i) => `$${i + 2}`
    ).join(', ');
    await queryRunner.query(
      `
      DELETE FROM "experience_skills"
      WHERE experience_id IN (SELECT id FROM "experiences" WHERE company = $1)
        AND skill_id IN (SELECT id FROM "skills" WHERE name IN (${removePlaceholders}))
      `,
      [ALTAMETRICS_COMPANY, ...SKILLS_TO_REMOVE]
    );

    // Step 5: Update the experience's skills array
    // First add new skills
    await queryRunner.query(
      `
      UPDATE "experiences"
      SET skills = skills || $2::varchar[]
      WHERE company = $1
        AND NOT (skills @> $2::varchar[])
      `,
      [ALTAMETRICS_COMPANY, SKILLS_TO_ADD]
    );

    // Then remove old skills
    for (const skillName of SKILLS_TO_REMOVE) {
      await queryRunner.query(
        `
        UPDATE "experiences"
        SET skills = array_remove(skills, $2)
        WHERE company = $1
        `,
        [ALTAMETRICS_COMPANY, skillName]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Restore original description and summary
    await queryRunner.query(
      `
      UPDATE "experiences"
      SET description = $2, summary = $3
      WHERE company = $1
      `,
      [ALTAMETRICS_COMPANY, ORIGINAL_DESCRIPTION, ORIGINAL_SUMMARY]
    );

    // Step 2: Remove added skill associations
    const addPlaceholders = SKILLS_TO_ADD.map((_, i) => `$${i + 2}`).join(', ');
    await queryRunner.query(
      `
      DELETE FROM "experience_skills"
      WHERE experience_id IN (SELECT id FROM "experiences" WHERE company = $1)
        AND skill_id IN (SELECT id FROM "skills" WHERE name IN (${addPlaceholders}))
      `,
      [ALTAMETRICS_COMPANY, ...SKILLS_TO_ADD]
    );

    // Step 3: Re-add original skill associations
    const removePlaceholders = SKILLS_TO_REMOVE.map(
      (_, i) => `$${i + 2}`
    ).join(', ');
    await queryRunner.query(
      `
      INSERT INTO "experience_skills" ("experience_id", "skill_id")
      SELECT e.id, s.id
      FROM "experiences" e
      CROSS JOIN "skills" s
      WHERE e.company = $1
        AND s.name IN (${removePlaceholders})
      ON CONFLICT DO NOTHING
      `,
      [ALTAMETRICS_COMPANY, ...SKILLS_TO_REMOVE]
    );

    // Step 4: Update the experience's skills array - remove added skills
    for (const skillName of SKILLS_TO_ADD) {
      await queryRunner.query(
        `
        UPDATE "experiences"
        SET skills = array_remove(skills, $2)
        WHERE company = $1
        `,
        [ALTAMETRICS_COMPANY, skillName]
      );
    }

    // Step 5: Re-add removed skills to array
    await queryRunner.query(
      `
      UPDATE "experiences"
      SET skills = skills || $2::varchar[]
      WHERE company = $1
        AND NOT (skills @> $2::varchar[])
      `,
      [ALTAMETRICS_COMPANY, SKILLS_TO_REMOVE]
    );

    // Step 6: Remove jQuery skill if no longer used
    for (const { name } of NEW_SKILLS) {
      await queryRunner.query(
        `
        DELETE FROM "skills"
        WHERE name = $1
          AND NOT EXISTS (
            SELECT 1 FROM "experience_skills" WHERE skill_id = skills.id
          )
        `,
        [name]
      );
    }
  }
}
