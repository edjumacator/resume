import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Remove Placeholder Testimonials Migration
 *
 * Removes fake placeholder testimonials that were added during initial development.
 */

const PLACEHOLDER_NAMES = ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez'];

export class RemovePlaceholderTestimonials1706500006000 implements MigrationInterface {
  name = 'RemovePlaceholderTestimonials1706500006000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "testimonials" WHERE "name" IN ($1, $2, $3)`, PLACEHOLDER_NAMES);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-add placeholder testimonials if needed
    const placeholders = [
      {
        name: 'Sarah Johnson',
        role: 'CEO',
        company: 'TechStart Inc.',
        avatarUrl: '/images/testimonials/placeholder.jpg',
        rating: 5,
        quote: 'Placeholder testimonial.',
        sortOrder: 0,
      },
      {
        name: 'Michael Chen',
        role: 'Product Manager',
        company: 'Innovate Labs',
        avatarUrl: '/images/testimonials/placeholder.jpg',
        rating: 5,
        quote: 'Placeholder testimonial.',
        sortOrder: 0,
      },
      {
        name: 'Emily Rodriguez',
        role: 'Founder',
        company: 'DesignCo',
        avatarUrl: '/images/testimonials/placeholder.jpg',
        rating: 5,
        quote: 'Placeholder testimonial.',
        sortOrder: 0,
      },
    ];

    for (const t of placeholders) {
      await queryRunner.query(
        `INSERT INTO "testimonials" ("name", "role", "company", "avatar_url", "rating", "quote", "sort_order")
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [t.name, t.role, t.company, t.avatarUrl, t.rating, t.quote, t.sortOrder]
      );
    }
  }
}
