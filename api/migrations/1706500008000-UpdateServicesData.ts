import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Update Services Data Migration
 *
 * Replaces placeholder services with experience-based services derived from actual skill data.
 * Each service now represents a skill category with relevant expertise areas.
 */

const NEW_SERVICES = [
  {
    icon: 'Code',
    title: 'Frontend Development',
    category: 'Frontend',
    description:
      'Building responsive, accessible web applications with React, TypeScript, and modern state management. Expertise in component architecture, performance optimization, and seamless user experiences.',
    sortOrder: 0,
  },
  {
    icon: 'Storage',
    title: 'Backend Development',
    category: 'Backend',
    description:
      'Designing scalable APIs and microservices with Node.js, Go, and GraphQL. Focus on clean architecture, RESTful design, and maintainable codebases.',
    sortOrder: 1,
  },
  {
    icon: 'Cloud',
    title: 'DevOps & Cloud Infrastructure',
    category: 'DevOps',
    description:
      'Implementing CI/CD pipelines, container orchestration with Kubernetes, and infrastructure as code with Terraform. Multi-cloud experience across AWS and GCP.',
    sortOrder: 2,
  },
  {
    icon: 'TableChart',
    title: 'Database Engineering',
    category: 'Database',
    description:
      'Designing efficient data models with PostgreSQL, MongoDB, and Redis. Experience with search engines, caching strategies, and data pipeline optimization.',
    sortOrder: 3,
  },
  {
    icon: 'AccountTree',
    title: 'Architecture & Leadership',
    category: 'Architecture',
    description:
      'Leading development teams and designing microservice architectures. Mentoring engineers, driving technical decisions, and delivering complex projects on time.',
    sortOrder: 4,
  },
  {
    icon: 'Security',
    title: 'Security & Compliance',
    category: 'Security',
    description:
      'Implementing security best practices with OWASP guidelines, HIPAA compliance, and policy-as-code tools. Vulnerability scanning and secure development workflows.',
    sortOrder: 5,
  },
];

export class UpdateServicesData1706500008000 implements MigrationInterface {
  name = 'UpdateServicesData1706500008000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // First, add the category column if it doesn't exist
    const hasCategory = await queryRunner.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'services' AND column_name = 'category'
    `);

    if (hasCategory.length === 0) {
      await queryRunner.query(`
        ALTER TABLE "services" ADD COLUMN "category" varchar(50)
      `);
    }

    // Delete all existing services
    await queryRunner.query(`DELETE FROM "services"`);

    // Insert new experience-based services
    for (const service of NEW_SERVICES) {
      await queryRunner.query(
        `INSERT INTO "services" ("icon", "title", "category", "description", "sort_order")
         VALUES ($1, $2, $3, $4, $5)`,
        [service.icon, service.title, service.category, service.description, service.sortOrder]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Delete new services
    await queryRunner.query(`DELETE FROM "services"`);

    // Re-add original placeholder services
    const placeholders = [
      {
        icon: 'DesignServices',
        title: 'UI/UX Design',
        description:
          'Creating intuitive and visually appealing user interfaces that enhance user experience and drive engagement.',
        sortOrder: 0,
      },
      {
        icon: 'Web',
        title: 'Web Design',
        description:
          'Building responsive and modern websites that look great on all devices and deliver exceptional performance.',
        sortOrder: 1,
      },
      {
        icon: 'RocketLaunch',
        title: 'Landing Page Design',
        description:
          'Designing high-converting landing pages that capture attention and turn visitors into customers.',
        sortOrder: 2,
      },
    ];

    for (const service of placeholders) {
      await queryRunner.query(
        `INSERT INTO "services" ("icon", "title", "description", "sort_order")
         VALUES ($1, $2, $3, $4)`,
        [service.icon, service.title, service.description, service.sortOrder]
      );
    }

    // Remove category column
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN IF EXISTS "category"`);
  }
}
