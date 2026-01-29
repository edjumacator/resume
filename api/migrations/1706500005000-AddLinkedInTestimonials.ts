import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Add LinkedIn Testimonials Migration
 *
 * Adds testimonials (recommendations) from LinkedIn connections.
 */

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  quote: string;
  sortOrder: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Dustin Schultz',
    role: 'Owner, Engineer',
    company: 'Mulletware',
    avatarUrl: '/images/testimonials/dustin-schultz.jpg',
    rating: 5,
    quote: `James has been my closest friend for most of the last decade. We've worked multiple jobs together and have a strong history of a shared passion for code. His dedication to understanding his preferred tools is unmatched. I've never worked with anyone who understands API development and REST standards the way he does. It's always been a pleasure to build UIs on his APIs.

More recently, after automating most of his API development he has moved on to the deployment space. I'm honestly not sure where it came from but his expertise with the latest automation tools has been equally impressive. I believe his main motivation for learning these things is simply a love of automation and efficiency. These are not areas that seem to interest most developers, but James is just wired that way. Who wants to learn every facet of Google Cloud? Seriously. He has mastered the docker/kubernetes/terraform space and loves showing me the newest related tools as they drop.

And knowing James as well as I do, I know how hungry he is. We've both had ups and downs in our career, but James is as skilled and passionate about delivering products today as he's ever been. He has something of a new lease on life this year and should be capable of reaching new highs as a developer in his career as well as integrating with teams in a deliberate and organized way. He's focused, and won't bring any nonsense to your team. He will, however, bring strong convictions founded on practical experience that will reap benefits for your project and team for years to come.

This is a really solid guy, and I challenge anyone to find a more devoted friend. He's helped me move more than once. He always does what he can, when he can. He's also been doing this work for a long time, and it shows.`,
    sortOrder: 1,
  },
  {
    name: 'David Huynh',
    role: 'Software Engineering Manager',
    company: 'Vizient, Inc',
    avatarUrl: '/images/testimonials/david-huynh.jpg',
    rating: 5,
    quote: `Being able to work with James has been a game changer for me. He's set the bar high with his knowledge and understanding of the different technology stacks whether it be Frontend (Javascript, React, NextJs) or Backend (Php, Python, Java, SQL). James is an excellent communicator and a great mentor to the younger engineers to ensure that they are on, and stay on, the right path. Having the chance to know him personally, he's a great human-being as well. I have zero hesitation recommending James to any future opportunities.`,
    sortOrder: 2,
  },
  {
    name: 'Josh Peal',
    role: 'AI Solutions Architect and Senior Manager',
    company: 'Vizient, Inc',
    avatarUrl: '/images/testimonials/josh-peal.jpg',
    rating: 5,
    quote: `I worked alongside James Crittenden on several projects, and I was always impressed by his strong technical skills and his ability to lead by example. James is an excellent programmer who knows how to tackle challenging problems and deliver well-thought-out, reliable solutions. His attention to detail and deep understanding of software development really stood out.

As a fellow leader, I appreciated James's collaborative approach. He's the kind of person who values input from others and knows how to bring a team together to achieve great results. His ability to balance technical depth with clear communication made him someone I could always rely on for insight and support.

James is a great combination of technical expertise and leadership, and I'd highly recommend him to anyone looking for someone they can count on to deliver and lead effectively.`,
    sortOrder: 3,
  },
  {
    name: 'Asane Yara',
    role: 'Software Engineer',
    company: 'Vizient, Inc',
    avatarUrl: '/images/testimonials/asane-yara.jpg',
    rating: 5,
    quote: `I had the privilege of working with James, a highly skilled Senior Software Engineer known for his deep knowledge and innovative problem-solving. He handled complex tasks with ease and was a fantastic mentor, sharing his expertise through workshops and supporting other engineers and the team. He would be a valuable addition to any team, and I highly recommend him.`,
    sortOrder: 4,
  },
  {
    name: 'Judy Rogers, CSM',
    role: 'Technical Project Management',
    company: "Lowe's Companies, Inc.",
    avatarUrl: '/images/testimonials/judy-rogers.jpg',
    rating: 5,
    quote: `I had the pleasure of working with James for Lowe's on a new checkout project for our stores. Very quickly I knew James' skills as a tech lead would help me assess the devs on my scrum team, helping out with their strengths and weaknesses. James came up with ideas how to get my team to the next level and the exchange of ideas and information made me a better Scrum Master. His work was always top notch and he really wanted to help his teammates. I'd be happy to work with James again!`,
    sortOrder: 5,
  },
  {
    name: 'Franklin Kirui',
    role: 'Senior Software Engineer',
    company: "Lowe's Companies, Inc.",
    avatarUrl: '/images/testimonials/franklin-kirui.jpg',
    rating: 5,
    quote: `Early in my career, I had the pleasure of working with James. His technical skills and passion for teaching others was something i leaned on to help me get up to speed and understand the technology. Im sure any team would be lucky to have James alongside them.`,
    sortOrder: 6,
  },
  {
    name: 'Nandya Thio',
    role: 'Sr. UX Designer',
    company: "Lowe's Companies, Inc.",
    avatarUrl: '/images/testimonials/nandya-thio.jpg',
    rating: 5,
    quote: `Collaborating with James had been a complete delight and a genuine privilege. Your enthusiasm greatness is very inspiring. Your creative approach to challenges and strong problem-solving abilities are impressive, and I'm always amazed by how you seamlessly transform ideas into reality.

James' readiness to impart knowledge, assist one another, and collaborate effectively has cultivated a setting that promotes innovation and development. Clearly, your hard work has resulted in outstanding accomplishments, and I appreciate being a part of this amazing journey alongside you.

Your commitment to making a positive difference and enhancing the lives of individuals through your engineering skills is genuinely impressive. The solutions you have created have impacted lives, whether via innovative technological breakthroughs or by addressing intricate issues in our community. Your efforts change industries, enhance productivity, and create a significant impact.`,
    sortOrder: 7,
  },
  {
    name: 'Misty White',
    role: 'Operations Manager',
    company: 'Aquent',
    avatarUrl: '/images/testimonials/misty-white.jpg',
    rating: 5,
    quote: `I had the pleasure of working with James for nearly two years, and he was such a valuable part of our team. James brought a solid level of technical skill and always had a proactive, problem-solving approach. He was committed to doing things the right way, which made a real difference in our projects.

James also brought a positive attitude every day. His hard work helped us reach our annual sales goals and gave us a boost during the busy season. He's a clear communicator and took the time to make sure everyone understood what was needed, which really helped bridge the gap for our non-technical team members.`,
    sortOrder: 8,
  },
];

export class AddLinkedInTestimonials1706500005000 implements MigrationInterface {
  name = 'AddLinkedInTestimonials1706500005000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const testimonial of TESTIMONIALS) {
      await queryRunner.query(
        `INSERT INTO "testimonials" ("name", "role", "company", "avatar_url", "rating", "quote", "sort_order")
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          testimonial.name,
          testimonial.role,
          testimonial.company,
          testimonial.avatarUrl,
          testimonial.rating,
          testimonial.quote,
          testimonial.sortOrder,
        ]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const names = TESTIMONIALS.map((t) => t.name);
    const placeholders = names.map((_, i) => `$${i + 1}`).join(', ');

    await queryRunner.query(`DELETE FROM "testimonials" WHERE "name" IN (${placeholders})`, names);
  }
}
