import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Add missing skills to the Six Flags experience
 *
 * This migration adds skills that were mentioned in or implied by the Six Flags
 * job description but not included in the original migration:
 * - Infrastructure as Code (new skill)
 * - Observability (new skill)
 * - Distributed Tracing (new skill)
 * - ELK (new skill - for centralized logging)
 * - Grafana (new skill - for observability)
 * - GitOps (existing skill - needs linking)
 */

// New skills to add to the skills table
const NEW_SKILLS: Array<{ name: string; category: string }> = [
  { name: 'Infrastructure as Code', category: 'DevOps' },
  { name: 'Observability', category: 'DevOps' },
  { name: 'Distributed Tracing', category: 'DevOps' },
  { name: 'ELK', category: 'DevOps' },
  { name: 'Grafana', category: 'DevOps' },
];

// All skills to link to Six Flags experience (new + existing)
const SKILLS_TO_LINK = [
  'Infrastructure as Code',
  'Observability',
  'Distributed Tracing',
  'ELK',
  'Grafana',
  'GitOps',
];

const SIX_FLAGS_COMPANY = 'Six Flags Entertainment Corporation';

export class UpdateSixFlagsSkills1706500010000 implements MigrationInterface {
  name = 'UpdateSixFlagsSkills1706500010000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Insert new skills (ON CONFLICT DO NOTHING for idempotency)
    for (const { name, category } of NEW_SKILLS) {
      await queryRunner.query(
        `INSERT INTO "skills" ("name", "category") VALUES ($1, $2) ON CONFLICT (name) DO NOTHING`,
        [name, category]
      );
    }

    // Step 2: Link skills to Six Flags experience via experience_skills
    const placeholders = SKILLS_TO_LINK.map((_, i) => `$${i + 2}`).join(', ');

    await queryRunner.query(
      `
      INSERT INTO "experience_skills" ("experience_id", "skill_id")
      SELECT e.id, s.id
      FROM "experiences" e
      CROSS JOIN "skills" s
      WHERE e.company = $1
        AND s.name IN (${placeholders})
      ON CONFLICT DO NOTHING
      `,
      [SIX_FLAGS_COMPANY, ...SKILLS_TO_LINK]
    );

    // Step 3: Update the experience's skills array for fallback compatibility
    // Use varchar[] cast to match the column type
    await queryRunner.query(
      `
      UPDATE "experiences"
      SET skills = skills || $2::varchar[]
      WHERE company = $1
        AND NOT (skills @> $2::varchar[])
      `,
      [SIX_FLAGS_COMPANY, SKILLS_TO_LINK]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Remove skill associations for the added skills
    const placeholders = SKILLS_TO_LINK.map((_, i) => `$${i + 2}`).join(', ');

    await queryRunner.query(
      `
      DELETE FROM "experience_skills"
      WHERE experience_id IN (SELECT id FROM "experiences" WHERE company = $1)
        AND skill_id IN (SELECT id FROM "skills" WHERE name IN (${placeholders}))
      `,
      [SIX_FLAGS_COMPANY, ...SKILLS_TO_LINK]
    );

    // Step 2: Remove skills from the experience's skills array
    for (const skillName of SKILLS_TO_LINK) {
      await queryRunner.query(
        `
        UPDATE "experiences"
        SET skills = array_remove(skills, $2)
        WHERE company = $1
        `,
        [SIX_FLAGS_COMPANY, skillName]
      );
    }

    // Step 3: Remove new skills that have no remaining associations
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
