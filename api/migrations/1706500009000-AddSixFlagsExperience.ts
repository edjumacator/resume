import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Add Six Flags Entertainment Corporation experience
 *
 * This migration adds James's newest position as AWS Cloud Architect at Six Flags
 * (May 2025 - Present) and introduces new skills related to the role.
 */

// New skills to add with their categories
const NEW_SKILLS: Array<{ name: string; category: string }> = [
  // DevOps
  { name: 'AWS EKS', category: 'DevOps' },
  { name: 'Kustomize', category: 'DevOps' },
  { name: 'Dynatrace', category: 'DevOps' },
  { name: 'Helm', category: 'DevOps' },

  // AI/ML
  { name: 'AWS Bedrock', category: 'AI/ML' },
  { name: 'GraphRAG', category: 'AI/ML' },

  // Backend
  { name: '.NET', category: 'Backend' },

  // Database
  { name: 'Vector Database', category: 'Database' },
];

// Skills to associate with the Six Flags experience
const SIX_FLAGS_SKILLS = [
  // New skills
  'AWS EKS',
  'Kustomize',
  'Dynatrace',
  'Helm',
  'AWS Bedrock',
  'GraphRAG',
  '.NET',
  'Vector Database',
  // Existing skills
  'AWS',
  'Terraform',
  'Kubernetes',
  'Docker',
  'PostgreSQL',
  'TDD',
  'Git',
  'TypeScript',
];

const SIX_FLAGS_EXPERIENCE = {
  startDate: 'May 2025',
  endDate: 'Present',
  company: 'Six Flags Entertainment Corporation',
  role: 'AWS Cloud Architect',
  summary:
    'Designing AWS cloud infrastructure, leading AI initiatives, and modernizing legacy systems while achieving near-complete observability coverage.',
  description: `Cloud Infrastructure & DevOps:
• Designed and deployed AWS EKS platforms using Terraform, Helm, Kubernetes, Kustomize, and Docker supporting multiple production services
• Reduced environment provisioning time by ~60% through standardized infrastructure as code
• Led enterprise adoption of Dynatrace, achieving near 100% observability coverage across infrastructure and applications
• Reduced mean time to detection and diagnosis by ~40% using distributed tracing and centralized logging

AI & Innovation:
• Spearheaded company's first AI initiatives using AWS Bedrock with Sonnet and Opus models
• Designed and implemented GraphRAG architecture using PostgreSQL and a vectorized data store

Backend Modernization:
• Modernized three legacy AI systems by migrating from .NET 6 to .NET 10
• Increased automated test coverage to ~98% and enforced coverage via git commit hooks to reduce regressions`,
  skills: [
    'AWS',
    'AWS EKS',
    'Terraform',
    'Helm',
    'Kubernetes',
    'Kustomize',
    'Docker',
    'Dynatrace',
    'AWS Bedrock',
    'GraphRAG',
    'PostgreSQL',
    '.NET',
    'Vector Database',
    'TDD',
    'Git',
  ],
  sortOrder: 1,
};

export class AddSixFlagsExperience1706500009000 implements MigrationInterface {
  name = 'AddSixFlagsExperience1706500009000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Shift all existing sort orders by 1 to make room for the new position
    await queryRunner.query(`UPDATE "experiences" SET sort_order = sort_order + 1`);

    // Step 2: Insert new skills (ON CONFLICT DO NOTHING for idempotency)
    for (const { name, category } of NEW_SKILLS) {
      await queryRunner.query(
        `INSERT INTO "skills" ("name", "category") VALUES ($1, $2) ON CONFLICT (name) DO NOTHING`,
        [name, category]
      );
    }

    // Step 3: Insert the new Six Flags experience
    await queryRunner.query(
      `
      INSERT INTO "experiences" ("start_date", "end_date", "company", "role", "summary", "description", "skills", "sort_order")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        SIX_FLAGS_EXPERIENCE.startDate,
        SIX_FLAGS_EXPERIENCE.endDate,
        SIX_FLAGS_EXPERIENCE.company,
        SIX_FLAGS_EXPERIENCE.role,
        SIX_FLAGS_EXPERIENCE.summary,
        SIX_FLAGS_EXPERIENCE.description,
        SIX_FLAGS_EXPERIENCE.skills,
        SIX_FLAGS_EXPERIENCE.sortOrder,
      ]
    );

    // Step 4: Add skill associations for the new experience
    const placeholders = SIX_FLAGS_SKILLS.map((_, i) => `$${i + 2}`).join(', ');

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
      [SIX_FLAGS_EXPERIENCE.company, ...SIX_FLAGS_SKILLS]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Remove skill associations for Six Flags experience
    await queryRunner.query(
      `
      DELETE FROM "experience_skills"
      WHERE experience_id IN (SELECT id FROM "experiences" WHERE company = $1)
      `,
      [SIX_FLAGS_EXPERIENCE.company]
    );

    // Step 2: Delete the Six Flags experience
    await queryRunner.query(`DELETE FROM "experiences" WHERE company = $1`, [
      SIX_FLAGS_EXPERIENCE.company,
    ]);

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

    // Step 4: Shift sort orders back down by 1
    await queryRunner.query(`UPDATE "experiences" SET sort_order = sort_order - 1`);
  }
}
