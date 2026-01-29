import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1706500000000 implements MigrationInterface {
  name = 'InitialSchema1706500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create services table
    await queryRunner.query(`
      CREATE TABLE "services" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "icon" character varying(50) NOT NULL,
        "title" character varying(100) NOT NULL,
        "description" text NOT NULL,
        "sort_order" integer NOT NULL DEFAULT 0,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_services" PRIMARY KEY ("id")
      )
    `);

    // Create experiences table
    await queryRunner.query(`
      CREATE TABLE "experiences" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "start_date" character varying(20) NOT NULL,
        "end_date" character varying(20) NOT NULL,
        "company" character varying(100) NOT NULL,
        "role" character varying(100) NOT NULL,
        "description" text NOT NULL,
        "sort_order" integer NOT NULL DEFAULT 0,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_experiences" PRIMARY KEY ("id")
      )
    `);

    // Create projects table
    await queryRunner.query(`
      CREATE TABLE "projects" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "title" character varying(100) NOT NULL,
        "category" character varying(50) NOT NULL,
        "tools" character varying[] NOT NULL,
        "image_url" character varying(255) NOT NULL,
        "link" character varying(255),
        "sort_order" integer NOT NULL DEFAULT 0,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_projects" PRIMARY KEY ("id")
      )
    `);

    // Create testimonials table
    await queryRunner.query(`
      CREATE TABLE "testimonials" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(100) NOT NULL,
        "role" character varying(100) NOT NULL,
        "company" character varying(100) NOT NULL,
        "avatar_url" character varying(255) NOT NULL,
        "rating" integer NOT NULL,
        "quote" text NOT NULL,
        "sort_order" integer NOT NULL DEFAULT 0,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_testimonials" PRIMARY KEY ("id")
      )
    `);

    // Create contact_submissions table
    await queryRunner.query(`
      CREATE TABLE "contact_submissions" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying(100) NOT NULL,
        "email" character varying(255) NOT NULL,
        "message" text NOT NULL,
        "privacy_accepted" boolean NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_contact_submissions" PRIMARY KEY ("id")
      )
    `);

    // Seed services data
    await queryRunner.query(`
      INSERT INTO "services" ("icon", "title", "description", "sort_order") VALUES
      ('DesignServices', 'UI/UX Design', 'Creating intuitive and engaging user experiences through thoughtful interface design, user research, and iterative prototyping.', 1),
      ('Web', 'Web Design', 'Designing modern, responsive websites that look great on any device and deliver exceptional user experiences.', 2),
      ('RocketLaunch', 'Landing Page Design', 'Crafting high-converting landing pages that capture attention, communicate value, and drive action.', 3)
    `);

    // Seed experiences data
    await queryRunner.query(`
      INSERT INTO "experiences" ("start_date", "end_date", "company", "role", "description", "sort_order") VALUES
      ('2020', 'Present', 'Self-Employed', 'Freelance UI/UX Designer', 'Working with clients worldwide to deliver exceptional digital experiences. Specializing in SaaS products, mobile apps, and brand identity design.', 1),
      ('2017', '2020', 'Insightancer', 'Senior Product Designer', 'Led the design team in creating data visualization dashboards and analytics tools. Improved user engagement by 40% through iterative design improvements.', 2),
      ('2014', '2017', 'KG Design Studio', 'UI Designer', 'Designed interfaces for web and mobile applications across various industries including fintech, healthcare, and e-commerce.', 3)
    `);

    // Seed projects data
    await queryRunner.query(`
      INSERT INTO "projects" ("title", "category", "tools", "image_url", "link", "sort_order") VALUES
      ('Finance Dashboard', 'Web Design', ARRAY['Figma', 'React', 'D3.js'], '/images/project-1.jpg', NULL, 1),
      ('Mobile Banking App', 'UI/UX Design', ARRAY['Sketch', 'Principle', 'Swift'], '/images/project-2.jpg', NULL, 2),
      ('E-commerce Platform', 'Web Design', ARRAY['Figma', 'Shopify', 'JavaScript'], '/images/project-3.jpg', NULL, 3),
      ('SaaS Landing Page', 'Landing Page', ARRAY['Figma', 'Webflow'], '/images/project-4.jpg', NULL, 4),
      ('Health & Fitness App', 'UI/UX Design', ARRAY['Adobe XD', 'Lottie', 'React Native'], '/images/project-5.jpg', NULL, 5),
      ('Travel Booking Website', 'Web Design', ARRAY['Figma', 'Next.js', 'Tailwind'], '/images/project-6.jpg', NULL, 6)
    `);

    // Seed testimonials data
    await queryRunner.query(`
      INSERT INTO "testimonials" ("name", "role", "company", "avatar_url", "rating", "quote", "sort_order") VALUES
      ('Sarah Johnson', 'CEO', 'TechStart Inc.', '/images/avatar-1.jpg', 5, 'Working with Jenny was an absolute pleasure. She transformed our vision into a beautiful, functional product that our users love.', 1),
      ('Michael Chen', 'Product Manager', 'Innovate Labs', '/images/avatar-2.jpg', 5, 'Exceptional attention to detail and a deep understanding of user needs. Jenny delivered beyond our expectations.', 2),
      ('Emily Rodriguez', 'Founder', 'DesignCo', '/images/avatar-3.jpg', 5, 'The best designer I''ve worked with. Professional, creative, and always delivers on time. Highly recommended!', 3),
      ('David Kim', 'CTO', 'AppWorks', '/images/avatar-4.jpg', 5, 'Jenny''s designs are not only visually stunning but also incredibly user-friendly. She truly understands the balance between aesthetics and functionality.', 4)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contact_submissions"`);
    await queryRunner.query(`DROP TABLE "testimonials"`);
    await queryRunner.query(`DROP TABLE "projects"`);
    await queryRunner.query(`DROP TABLE "experiences"`);
    await queryRunner.query(`DROP TABLE "services"`);
  }
}
