import { MigrationInterface, QueryRunner } from 'typeorm';

// Skill to category mapping
const SKILL_CATEGORIES: Record<string, string> = {
  // Frontend
  'React': 'Frontend',
  'Redux': 'Frontend',
  'RTK': 'Frontend',
  'TypeScript': 'Frontend',
  'JavaScript': 'Frontend',
  'HTML5': 'Frontend',
  'CSS': 'Frontend',
  'Front-end': 'Frontend',
  'Single-Page Architecture': 'Frontend',
  'Mobile Applications': 'Frontend',

  // Backend
  'Node.js': 'Backend',
  'Express.js': 'Backend',
  'Go': 'Backend',
  'Gin': 'Backend',
  'PHP': 'Backend',
  'Yii2': 'Backend',
  'Yii Framework': 'Backend',
  'GraphQL': 'Backend',
  'REST': 'Backend',
  'RESTful WebServices': 'Backend',
  'Java': 'Backend',
  'Apache': 'Backend',
  'MVC': 'Backend',
  'Web Development': 'Backend',

  // DevOps
  'Kubernetes': 'DevOps',
  'Docker': 'DevOps',
  'Terraform': 'DevOps',
  'ArgoCD': 'DevOps',
  'Helm Charts': 'DevOps',
  'GitOps': 'DevOps',
  'AWS': 'DevOps',
  'AWS CLI': 'DevOps',
  'AWS Lambda': 'DevOps',
  'GCP': 'DevOps',
  'GKE': 'DevOps',
  'IaaS': 'DevOps',
  'Fluxv2': 'DevOps',
  'Traefik': 'DevOps',
  'Portainer': 'DevOps',
  'Teleport': 'DevOps',

  // Database
  'PostgreSQL': 'Database',
  'MongoDB': 'Database',
  'Redis': 'Database',
  'Elasticsearch': 'Database',
  'MySQL': 'Database',
  'NoSQL': 'Database',
  'SQL': 'Database',
  'Databases': 'Database',
  'Relational Databases': 'Database',
  'Relational Data Modeling': 'Database',
  'Solr': 'Database',

  // Testing
  'TDD': 'Testing',
  'BDD': 'Testing',
  'Jest': 'Testing',
  'Codeception': 'Testing',
  'Unit Testing': 'Testing',

  // Security
  'Open Policy Agent': 'Security',
  'TFSec': 'Security',

  // Management
  'Leading Development Teams': 'Management',
  'Software Management': 'Management',
  'Software Product Management': 'Management',
  'Software Development': 'Management',
  'Agile Methodologies': 'Management',
  'Project Management': 'Management',

  // Architecture
  'Microservice Architecture': 'Architecture',
  'Platform Architecture': 'Architecture',

  // Tools
  'Git': 'Tools',
  'Vim': 'Tools',
  'Linux': 'Tools',
  'Arch Linux': 'Tools',
  'Automation': 'Tools',

  // AI/ML
  'Machine Learning': 'AI/ML',
  'NLP': 'AI/ML',
};

export class SkillsNormalization1706500003000 implements MigrationInterface {
  name = 'SkillsNormalization1706500003000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create skills table
    await queryRunner.query(`
      CREATE TABLE "skills" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" varchar(100) UNIQUE NOT NULL,
        "category" varchar(50) NOT NULL,
        "created_at" TIMESTAMP DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now()
      )
    `);

    // Create junction table
    await queryRunner.query(`
      CREATE TABLE "experience_skills" (
        "experience_id" uuid REFERENCES "experiences"("id") ON DELETE CASCADE,
        "skill_id" uuid REFERENCES "skills"("id") ON DELETE CASCADE,
        PRIMARY KEY ("experience_id", "skill_id")
      )
    `);

    // Create index for faster lookups
    await queryRunner.query(`
      CREATE INDEX "idx_experience_skills_experience" ON "experience_skills"("experience_id")
    `);
    await queryRunner.query(`
      CREATE INDEX "idx_experience_skills_skill" ON "experience_skills"("skill_id")
    `);

    // Extract unique skills from existing experiences and insert into skills table
    const experiences = await queryRunner.query(`
      SELECT id, skills FROM "experiences"
    `);

    // Collect all unique skills
    const uniqueSkills = new Set<string>();
    for (const exp of experiences) {
      if (exp.skills && Array.isArray(exp.skills)) {
        for (const skill of exp.skills) {
          uniqueSkills.add(skill);
        }
      }
    }

    // Insert skills with categories
    for (const skillName of uniqueSkills) {
      const category = SKILL_CATEGORIES[skillName] || 'Other';
      await queryRunner.query(
        `INSERT INTO "skills" ("name", "category") VALUES ($1, $2)`,
        [skillName, category]
      );
    }

    // Get all skills with their IDs
    const skillRows = await queryRunner.query(`SELECT id, name FROM "skills"`);
    const skillNameToId = new Map<string, string>();
    for (const row of skillRows) {
      skillNameToId.set(row.name, row.id);
    }

    // Populate junction table
    for (const exp of experiences) {
      if (exp.skills && Array.isArray(exp.skills)) {
        for (const skillName of exp.skills) {
          const skillId = skillNameToId.get(skillName);
          if (skillId) {
            await queryRunner.query(
              `INSERT INTO "experience_skills" ("experience_id", "skill_id") VALUES ($1, $2)`,
              [exp.id, skillId]
            );
          }
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_experience_skills_skill"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_experience_skills_experience"`);

    // Drop junction table
    await queryRunner.query(`DROP TABLE IF EXISTS "experience_skills"`);

    // Drop skills table
    await queryRunner.query(`DROP TABLE IF EXISTS "skills"`);
  }
}
