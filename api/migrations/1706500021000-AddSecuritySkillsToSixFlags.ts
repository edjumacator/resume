import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Add AWS security skills to the Six Flags experience
 *
 * This migration adds Security-categorized AWS skills to enable the Six Flags
 * position to appear when filtering by the Security skill category:
 * - AWS IAM (Identity and Access Management)
 * - AWS Security Hub (Security posture management)
 * - AWS GuardDuty (Threat detection)
 * - AWS CloudTrail (Audit logging)
 * - AWS KMS (Key Management Service)
 */

// New security skills to add to the skills table
const NEW_SKILLS: Array<{ name: string; category: string }> = [
  { name: 'AWS IAM', category: 'Security' },
  { name: 'AWS Security Hub', category: 'Security' },
  { name: 'AWS GuardDuty', category: 'Security' },
  { name: 'AWS CloudTrail', category: 'Security' },
  { name: 'AWS KMS', category: 'Security' },
];

// All skills to link to Six Flags experience
const SKILLS_TO_LINK = [
  'AWS IAM',
  'AWS Security Hub',
  'AWS GuardDuty',
  'AWS CloudTrail',
  'AWS KMS',
];

const SIX_FLAGS_COMPANY = 'Six Flags Entertainment Corporation';

export class AddSecuritySkillsToSixFlags1706500021000 implements MigrationInterface {
  name = 'AddSecuritySkillsToSixFlags1706500021000';

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
