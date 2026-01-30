import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePlaceholderProjects1706500012000 implements MigrationInterface {
  name = 'RemovePlaceholderProjects1706500012000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remove placeholder projects by title
    await queryRunner.query(`
      DELETE FROM "projects"
      WHERE "title" IN (
        'Finance Dashboard',
        'Mobile Banking App',
        'E-commerce Platform',
        'SaaS Landing Page',
        'Health & Fitness App',
        'Travel Booking Website'
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-insert placeholder projects
    await queryRunner.query(`
      INSERT INTO "projects" ("title", "category", "tools", "image_url", "link", "sort_order") VALUES
      ('Finance Dashboard', 'Web Design', ARRAY['Figma', 'React', 'D3.js'], '/images/project-1.jpg', NULL, 1),
      ('Mobile Banking App', 'UI/UX Design', ARRAY['Sketch', 'Principle', 'Swift'], '/images/project-2.jpg', NULL, 2),
      ('E-commerce Platform', 'Web Design', ARRAY['Figma', 'Shopify', 'JavaScript'], '/images/project-3.jpg', NULL, 3),
      ('SaaS Landing Page', 'Landing Page', ARRAY['Figma', 'Webflow'], '/images/project-4.jpg', NULL, 4),
      ('Health & Fitness App', 'UI/UX Design', ARRAY['Adobe XD', 'Lottie', 'React Native'], '/images/project-5.jpg', NULL, 5),
      ('Travel Booking Website', 'Web Design', ARRAY['Figma', 'Next.js', 'Tailwind'], '/images/project-6.jpg', NULL, 6)
    `);
  }
}
