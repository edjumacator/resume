import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Skills Reconciliation Migration
 *
 * This migration adds missing skill associations based on experience descriptions.
 * Many experiences mention technologies in their descriptions that are not
 * reflected in their skill associations.
 */

// New skills to add with their categories
const NEW_SKILLS: Array<{ name: string; category: string }> = [
  // Backend
  { name: 'Apollo', category: 'Backend' },
  { name: 'Spring MVC', category: 'Backend' },
  { name: 'Ruby', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Django', category: 'Backend' },

  // Frontend
  { name: 'Redux Saga', category: 'Frontend' },
  { name: 'Reselect', category: 'Frontend' },
  { name: 'Immer', category: 'Frontend' },
  { name: 'MUI', category: 'Frontend' },
  { name: 'styled-components', category: 'Frontend' },
  { name: 'Recharts', category: 'Frontend' },
  { name: 'AngularJS', category: 'Frontend' },
  { name: 'Angular', category: 'Frontend' },

  // DevOps
  { name: 'ELK', category: 'DevOps' },
  { name: 'Grafana', category: 'DevOps' },
  { name: 'Prometheus', category: 'DevOps' },
  { name: 'Jenkins', category: 'DevOps' },
  { name: 'ECS', category: 'DevOps' },

  // Security
  { name: 'OWASP', category: 'Security' },
  { name: 'HIPAA', category: 'Security' },
  { name: 'Terrascan', category: 'Security' },
  { name: 'Trivy', category: 'Security' },

  // Tools
  { name: 'Plop', category: 'Tools' },
  { name: 'Salesforce', category: 'Tools' },
  { name: 'PhantomJS', category: 'Tools' },
  { name: 'Bash', category: 'Tools' },
  { name: 'Neovim', category: 'Tools' },
];

// Missing skills to add by experience (company name)
const EXPERIENCE_SKILL_ADDITIONS: Record<string, string[]> = {
  'Epic Labor': [
    'TypeScript',
    'Node.js',
    'GraphQL',
    'Apollo',
    'Docker',
    'ELK',
    'Grafana',
    'React',
    'Redux',
    'OWASP',
    'Recharts',
  ],
  'Vizient, Inc': [
    'Node.js',
    'Express.js',
    'Traefik',
    'ELK',
    'Grafana',
    'HIPAA',
    'OWASP',
    'Helm Charts',
    'Reselect',
    'Immer',
  ],
  "Lowe's Companies, Inc.": [
    'Node.js',
    'Express.js',
    'ELK',
    'Redux Saga',
    'Reselect',
    'Immer',
    'MUI',
    'styled-components',
    'Plop',
  ],
  Allstate: [
    'Gin',
    'Terraform',
    'Helm Charts',
    'Grafana',
    'Prometheus',
    'Terrascan',
    'Trivy',
    'Reselect',
    'Immer',
    'Plop',
  ],
  'Max Recruiting Solutions': ['Elasticsearch', 'Redis', 'Terraform', 'Helm Charts'],
  Aquent: ['Spring MVC', 'Salesforce', 'AngularJS', 'Angular', 'Ruby'],
  'Ziff Davis': ['Terraform', 'Docker', 'Jenkins', 'ECS', 'Elasticsearch', 'Python', 'Django'],
  'Wide Open Technologies': ['Terraform', 'Docker', 'PhantomJS'],
  Mulletware: ['Plop', 'Bash', 'Neovim'],
};

export class SkillsReconciliation1706500004000 implements MigrationInterface {
  name = 'SkillsReconciliation1706500004000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Step 1: Insert new skills (ON CONFLICT DO NOTHING for idempotency)
    for (const { name, category } of NEW_SKILLS) {
      await queryRunner.query(
        `INSERT INTO "skills" ("name", "category") VALUES ($1, $2) ON CONFLICT (name) DO NOTHING`,
        [name, category]
      );
    }

    // Step 2: Add skill associations for each experience
    for (const [company, skillNames] of Object.entries(EXPERIENCE_SKILL_ADDITIONS)) {
      if (skillNames.length === 0) continue;

      // Build the skill names list for the IN clause
      const placeholders = skillNames.map((_, i) => `$${i + 2}`).join(', ');

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
        [company, ...skillNames]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the skill associations added by this migration
    for (const [company, skillNames] of Object.entries(EXPERIENCE_SKILL_ADDITIONS)) {
      if (skillNames.length === 0) continue;

      const placeholders = skillNames.map((_, i) => `$${i + 2}`).join(', ');

      await queryRunner.query(
        `
        DELETE FROM "experience_skills"
        WHERE experience_id IN (SELECT id FROM "experiences" WHERE company = $1)
          AND skill_id IN (SELECT id FROM "skills" WHERE name IN (${placeholders}))
        `,
        [company, ...skillNames]
      );
    }

    // Remove the new skills added by this migration
    // (only if they have no remaining associations)
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
