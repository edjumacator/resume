import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateExperienceData1706500002000 implements MigrationInterface {
  name = 'UpdateExperienceData1706500002000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add summary column if it doesn't exist
    const hasColumn = await queryRunner.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'experiences' AND column_name = 'summary'
    `);
    if (hasColumn.length === 0) {
      await queryRunner.query(`
        ALTER TABLE "experiences" ADD COLUMN "summary" text
      `);
    }

    // Clear existing experiences
    await queryRunner.query(`DELETE FROM "experiences"`);

    // Insert updated experience data from LinkedIn
    await queryRunner.query(`
      INSERT INTO "experiences" ("start_date", "end_date", "company", "role", "summary", "description", "skills", "sort_order") VALUES
      (
        'October 2022',
        'Present',
        'Mulletware',
        'Co-Founder',
        'We specialize in maintaining and contributing to open-source libraries, boilerplates, and automation tools.',
        'Our Completed Projects:
• Form library that requests the rules from a RESTful controller and generates the corresponding form.
• State management tool that utilizes the capacity of Redux Toolkit Query and expresses it using a Hook-style syntax with type-checking baked in, and numerous helper functions that promote Immutability & Optimization without the hassle at the component-level.
• React Boilerplate that incorporates all of our tools and also provides a number of plop generators.
• Yii2 boilerplate that goes above and beyond the frameworks desired goals.
• Language-specific snippets

Works in progress:
• Nvim/Neovide Plugins
• Audio/Visual libraries for Arch
• Bash/Zsh scripts for upgrade maintenance in rolling distros',
        ARRAY['Redux', 'RESTful WebServices', 'Leading Development Teams', 'NLP', 'Fluxv2', 'Redis', 'Single-Page Architecture', 'NoSQL', 'Git', 'Solr', 'Machine Learning', 'TDD', 'GitOps', 'React', 'PHP', 'TypeScript', 'PostgreSQL', 'Arch Linux', 'Microservice Architecture', 'Yii2', 'Go', 'BDD', 'Mobile Applications', 'Kubernetes', 'REST', 'Front-end', 'Jest', 'Vim', 'IaaS', 'Automation', 'Software Product Management', 'Software Development', 'GKE', 'Docker', 'HTML5'],
        1
      ),
      (
        'June 2023',
        'November 2024',
        'Epic Labor',
        'Software Engineering Manager',
        'Led the development of an internal sales intelligence platform that optimized sales pipeline management and automated scheduling.',
        'Leadership & Strategy:
• Managed a team of three engineers as the lead software engineer while driving the adoption of an "automation-first" culture in all layers of the tech stack.

DevOps & Infrastructure:
• Managed the implementation of a multi-cluster environment with a focus on GitOps workflows using ArgoCD, Terraform, Helm, Kubernetes, and Docker Compose.
• Integrated a centralized logging and monitoring stack (ELK + Grafana) alongside an intracost report for deployment costs, saving the company 15% during non-work hours.

Backend Development:
• Developed a production-ready Apollo GraphQL API in TypeScript/Node to unify sales and contact data, improving API efficiency and reducing payload size by approximately 40% across core workflows.
• Enforced secure API design principles using domain-driven design, OWASP compliance, achieving a minimum of a qualified opinion among our SOC 2 audits.
• Modularized schema architecture using Apollo Federation principles to prepare for future service separation and ensure long-term maintainability.
• Engineered a behavior-driven notification system that generated tasks based on user behavior and sales benchmarks, leading to a measurable improvement in rep follow-through and engagement consistency.

Frontend Development:
• Built a React 19 application, incorporating Redux Toolkit and GraphQL for enhanced state management and performance optimizations.
• Designed a dynamic dashboard with real-time sales analytics using webhooks, while using Recharts to render the information, empowering leadership with data-driven decision-making tools.',
        ARRAY['Software Management', 'Platform Architecture', 'GCP', 'GKE', 'ArgoCD', 'Terraform', 'Helm Charts', 'Kubernetes', 'Go', 'Gin'],
        2
      ),
      (
        'October 2020',
        'May 2023',
        'Vizient, Inc',
        'Software Engineering Manager',
        'My team and I were tasked with improving and providing specialized reports at the patient level for the DOD and VA.',
        'Key Accomplishments:

Leadership:
• Persuaded stakeholders to expand the engineering teams from 5 to 11, delivering Department of Defense project milestones ahead of schedule and setting the stage for our acquisition by Vizient.
• Assisted junior engineers in their transition to more senior roles by hosting coding workshops and hackathons.
• Integrated a "manage-through-code" approach for senior leadership.

Dev-Ops:
• Guided my teams in adopting ArgoCD, Terraform, and Helm, utilizing an ELK stack for enhanced log-level visibility and Grafana''s real-time performance insights to maintain 100% SLA adherence.
• Built a scalable microservice framework leveraging Traefik, supporting 1M+ daily requests with 99.9% availability, while automating HTTPS certificate management through ACME integrations.

Backend:
• Advocated for OWASP adoption, helping my team achieve Level 3 HIPAA compliance via TDD and pass regulatory audits for the Department of Defense across 600+ VA hospitals.
• Created plop generators for scaffolding Node/Express controllers, models, services, DTOs, and types in TypeScript.

Frontend:
• Lead the transition to React 18, Redux, and Sagas, enhancing state management and accessibility throughout the ecosystem by incorporating tools like Reselect & Immer.
• Introduced and promoted best practices such as modularization, caching, memoization, immutability, lazy-loading, and testing, which positively affected code quality and paved the way to code automation tools using Plop.',
        ARRAY['Redux', 'RESTful WebServices', 'Leading Development Teams', 'Terraform', 'Software Management', 'NoSQL', 'Git', 'TDD', 'GitOps', 'React', 'TypeScript', 'AWS CLI', 'Microservice Architecture', 'Unit Testing', 'BDD', 'MongoDB', 'JavaScript', 'Relational Databases', 'Kubernetes', 'REST', 'Databases', 'Front-end', 'Jest', 'IaaS', 'Automation', 'Software Product Management', 'Docker'],
        3
      ),
      (
        'September 2019',
        'September 2020',
        'Lowe''s Companies, Inc.',
        'Lead Software Engineer',
        'My team and I were tasked with implementing a new point-of-sale system in all Lowes locations.',
        'Key Accomplishments:
• Delivered a new in-store & mobile checkout system using React to all 1,700 stores nationwide.

DevOps:
• Introduced Terraformer in the lab to convert our AWS configuration into Terraform files, achieving a 40% reduction in provisioning time, a 15% decrease in operational costs during closures, and enhanced security through Open Policy Agent policy refinements.
• Secured developer and admin access to critical systems with Teleport and Portainer, integrating single sign-on (SSO) and session recording for auditing, and utilized an ELK stack for centralized logging.
• Simplified multi-environment deployments with Portainer, enabling consistent configuration across development, staging, and production environments while achieving 99.9% uptime during updates and reducing deployment times by 15%.

Backend:
• Introduced leadership to PCI DSS, SOC 1 & 2, and ISO 27001 standards, improving information security compliance while handling credit card and financial reporting data.
• Created plop generators for scaffolding Node/Express controllers, models, services, DTOs, and types in TypeScript.

Frontend:
• Implemented a Domain-Driven, REST-style interface for Redux-Sagas using async generator functions, which made requests easier to read, write, and generate.
• Led the transition to React 18, Redux, and Sagas, enhancing state accessibility and minimizing errors by implementing effective state management and dependency injection using Reselect & Immer.
• Architected a Lowes-wide MUI standard and corresponding theme for ease of use in styled-components.',
        ARRAY['Redux', 'RESTful WebServices', 'Leading Development Teams', 'Terraform', 'Software Management', 'RTK', 'Git', 'TDD', 'React', 'TypeScript', 'Microservice Architecture', 'Unit Testing', 'BDD', 'Mobile Applications', 'JavaScript', 'Relational Databases', 'Kubernetes', 'REST', 'Front-end', 'Jest', 'Vim', 'IaaS', 'Automation', 'Software Development', 'Traefik', 'Portainer', 'Teleport', 'Open Policy Agent', 'TFSec'],
        4
      ),
      (
        'August 2018',
        'September 2019',
        'Allstate',
        'Lead Software Engineer',
        'Our lab served as a transitional R&D workspace to support the evaluation and placement of junior and mid-level engineers into permanent roles.',
        'Key Accomplishments:

Leadership:
• Achieved a 90% success rate in facilitating the permanent placement of junior and mid-level engineers within the organization.
• Consistently delivered code with 94-97% test coverage, while accruing zero medium or high-risk technical debts in the process.

DevOps:
• Partnered with cross-functional teams to create a scalable AWS multi-tenant framework, leveraging Terraform and Helm to ensure Kubernetes efficiency, improve SLA compliance, and reduce deployment errors by 20%.
• Conducted regulatory audits, ensuring 100% infrastructure visibility and proactively addressing security gaps with Open Policy Agent, Terrascan, and Trivy.
• Collaborated with all four engineering teams to integrate Grafana and Prometheus, providing actionable server insights and enabling auto-scaling to reduce costs by 15% during non-peak hours.

Backend:
• Built RESTful API services with Go (Gin-Gonic) to support claims department applications.
• Developed third-party API microservices in TypeScript (Node/Express) for cross-departmental initiatives.

Frontend:
• Delivered two greenfield front-end initiatives for our subsidiary Esurance 3 weeks ahead of schedule.
• Introduced React 18 best practices and supporting libraries such as RTK-query, Reselect, and Immer, laying the foundation for lab-wide code standards that were easily converted into code generating tools using Plop.',
        ARRAY['Redux', 'RESTful WebServices', 'Leading Development Teams', 'Software Management', 'Redis', 'NoSQL', 'Node.js', 'Agile Methodologies', 'Git', 'Solr', 'Machine Learning', 'TDD', 'React', 'TypeScript', 'PostgreSQL', 'AWS CLI', 'Microservice Architecture', 'AWS', 'Go', 'BDD', 'MongoDB', 'Mobile Applications', 'Kubernetes', 'REST', 'Front-end', 'Jest', 'IaaS', 'Automation', 'Express.js'],
        5
      ),
      (
        'September 2017',
        'August 2018',
        'Max Recruiting Solutions',
        'Software Engineering Manager',
        'Built and led a team to develop recruiting technology solutions.',
        'Key Accomplishments:
• Built a team of 6 engineers, doubling development capacity to support two new additional product lines, with a streamlined onboarding process that enabled rapid integration.
• Developed and maintained the data modeling and architecture using Postgres, Redis, and Elasticsearch for nearly 30 states.
• Migrated existing infrastructure to GCP using Terraform and Helm, providing reliable cluster orchestration with Kubernetes and reducing existing infrastructure costs by 75%.
• Integrated Bullhorn API into operations, enhancing credit-limit checks, past-due alerts, and reimbursements, saving the average office within the organization $800/month.
• Implemented real-time analytics and tracking tools to monitor sales rep performance, improving transparency and boosting average sales during peak season by 25% per office.',
        ARRAY['Redux', 'RESTful WebServices', 'Leading Development Teams', 'Apache', 'NLP', 'Software Management', 'Single-Page Architecture', 'Git', 'Machine Learning', 'TDD', 'React', 'Codeception', 'TypeScript', 'PostgreSQL', 'Microservice Architecture', 'Go', 'BDD', 'Kubernetes', 'REST', 'Front-end', 'Vim', 'IaaS', 'Automation', 'Software Product Management', 'Software Development', 'GKE', 'HTML5'],
        6
      ),
      (
        'July 2017',
        'October 2017',
        'Aquent',
        'Sr. Software Engineer',
        'Relocation period - API and front-end development.',
        'API Development: (Java / Spring MVC)
• Added new core features to the existing company CRM.
• Integrated the CRM with Salesforce API.
• Integrated TDD / BDD using a ruby framework.

Front-End Development:
• Assisted the transition from AngularJS to Angular 2.
• Replaced existing forms with Angular Reactive FormBuilder.
• Implemented 4 new client facing features.',
        ARRAY['Redux', 'RESTful WebServices', 'Redis', 'Single-Page Architecture', 'Git', 'Solr', 'Machine Learning', 'TDD', 'React', 'TypeScript', 'PostgreSQL', 'Microservice Architecture', 'AWS', 'BDD', 'REST', 'Front-end', 'Vim', 'Automation', 'Software Development', 'Docker', 'HTML5', 'Java'],
        7
      ),
      (
        'February 2016',
        'July 2017',
        'Ziff Davis',
        'Lead Software Engineer',
        'Led API development, data ingestion, and ElasticSearch implementation.',
        'Key Accomplishments:
• Automated AWS ECS provisioning with Terraform & Docker Compose, reducing local build times and deployments by over 9+ minutes per build, saving over 40+ hours per month across the team and maintaining 99.9% uptime during updates.
• Refined REST API standards in Yii2 with Gii tools, cutting endpoint creation time by 95% and standardizing API structure across teams for improved scalability.
• Managed the daily curation and reconciliation of 2TB of National Institute of Health data, reducing CMS normalization time by 5 hours per cycle and enhancing processing efficiency by 15%.

Dev-Ops / Microservice Architecture:
• Deployed an AWS ECS Cluster using Docker Compose.
• Utilized swarm mode (4 nodes).
• Jenkins Deployment Pipeline.

API Development:
• Improved company-wide REST standards using Yii2.
• Automated the creation of Yii2 API modules.
• Architect of 4 APIs and migrated 2 legacy; maintained all.
• TDD / BDD utilizing codeception.

Ingestion Engine:
• Built a Yii2 ActiveQuery for the National Institute of Health.
• Ingested, curated, and normalized over 15TB of data.
• Migrated the codebase from Python/Django to PHP7/Yii2.

ElasticSearch:
• Implemented a Yii2 / Elasticsearch (5.0) ActiveRecord.
• Designed a Yii2 ElasticSearch Component & Interface.
• Deployed ELK stack using Docker Compose.',
        ARRAY['RESTful WebServices', 'Leading Development Teams', 'NLP', 'Software Management', 'MySQL', 'NoSQL', 'Git', 'Solr', 'Machine Learning', 'TDD', 'React', 'Codeception', 'TypeScript', 'AWS CLI', 'Microservice Architecture', 'Yii2', 'AWS', 'MongoDB', 'REST', 'Vim', 'Automation', 'Software Development', 'HTML5', 'AWS Lambda'],
        8
      ),
      (
        'July 2015',
        'January 2016',
        'Wide Open Technologies',
        'Lead Software Engineer',
        'Led development of two primary projects including a social application and an equipment web scraper.',
        'Key Accomplishments:
• Provisioned an AWS ECS cluster using Terraform & Docker Compose for the two primary projects I was tasked to build, providing reliable deployments and 99.9% uptime during updates.
• Delivered a used equipment web scraper to a client that was later acquired by Caterpillar for $3 million.

Contributions:

My Legacy Keeper: Yii2 / React JS Social Application
• Designed the entire database schema through the use of Yii2 Migrations.
• Generation and Configuration of all active record models.
• Generation and Configuration of all RESTful controllers.
• Implementation of Yii2 RBAC.

Used Equipment Guide: Asynchronous NodeJS Script
• Constructed and implemented the entire database schema.
• Utilized ECMAScript 6 standards - Promises, Classes, Awaits, Yields, and Generators.
• Converted Phantom.js into a headless web scraper capable of emulating user mocked headers and frequencies.
• Visits over 30 sites daily and returns the content to undergo a curation & normalization process.',
        ARRAY['Redux', 'RESTful WebServices', 'Leading Development Teams', 'Software Management', 'MySQL', 'Single-Page Architecture', 'Node.js', 'Git', 'TDD', 'React', 'Codeception', 'MVC', 'TypeScript', 'PostgreSQL', 'AWS CLI', 'Unit Testing', 'Yii2', 'Web Development', 'AWS', 'BDD', 'Express.js', 'JavaScript', 'REST', 'Front-end', 'Jest', 'Vim', 'Automation', 'Software Development', 'Linux', 'HTML5'],
        9
      ),
      (
        'June 2014',
        'July 2015',
        'NovaCor Consulting Group, LLC',
        'Software Engineering Manager',
        'Managed development teams and established engineering workflows and standards.',
        '• Ensured team members had appropriate project comprehension, direction, and necessary resources prior to drafting project requirements.
• Applied a design driven approach to assist senior management in the construction of business plans, requirements specifications, and timelines.
• Direct involvement in data architecture/modeling.
• Oversaw distributed version control system implementation and monitor daily developer interactions with established repositories.
• Established pair programming and DVCS standards to maintain effective workflows.
• Implemented a developer workflow that harmonizes with the MVC architecture; drastically improving the day-to-day DVCS operations and code integrity.
• Monitored individual developer progress and comprehension of established workflow standards.
• Coordinated internship oversight and delegate daily responsibilities through task assignment to senior developers who oversee implementation.
• Conducted daily scrum meetings and help developers resolve issues, technical and human alike.
• Established a positive yet challenging environment for developers to grow into leaders, capable of providing guidance and motivation to aspiring interns.',
        ARRAY['Relational Data Modeling', 'RESTful WebServices', 'CSS', 'Leading Development Teams', 'MySQL', 'Git', 'TDD', 'Codeception', 'MVC', 'PostgreSQL', 'Yii Framework', 'SQL', 'Unit Testing', 'Yii2', 'Web Development', 'AWS', 'BDD', 'Project Management', 'Mobile Applications', 'JavaScript', 'Relational Databases', 'REST', 'Databases', 'Front-end', 'Jest', 'Vim', 'Automation', 'Software Product Management', 'HTML5'],
        10
      ),
      (
        'March 2013',
        'February 2014',
        'Altametrics',
        'Lead Software Engineer',
        'Led development of a user guided tour system and brand loyalty application.',
        'I was tasked with leading two primary projects:

User Guided Tour System:
This product helped users familiarize themselves with the HULA system as well as the various settings required to configure it.

A Brand Loyalty Application driven by a series of mini-games.',
        ARRAY['Leading Development Teams', 'Software Management', 'Git', 'Codeception', 'MVC', 'PHP', 'PostgreSQL', 'Mobile Applications', 'JavaScript', 'REST', 'Databases', 'Front-end', 'Vim', 'HTML5'],
        11
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Restore original data
    await queryRunner.query(`DELETE FROM "experiences"`);
    await queryRunner.query(`
      INSERT INTO "experiences" ("start_date", "end_date", "company", "role", "description", "skills", "sort_order") VALUES
      ('2020', 'Present', 'Self-Employed', 'Freelance UI/UX Designer', 'Working with clients worldwide to deliver exceptional digital experiences. Specializing in SaaS products, mobile apps, and brand identity design.', ARRAY['Figma', 'UI/UX Design', 'User Research', 'Prototyping', 'Design Systems', 'Webflow'], 1),
      ('2017', '2020', 'Insightancer', 'Senior Product Designer', 'Led the design team in creating data visualization dashboards and analytics tools. Improved user engagement by 40% through iterative design improvements.', ARRAY['Product Design', 'Data Visualization', 'D3.js', 'Design Leadership', 'User Testing', 'Agile'], 2),
      ('2014', '2017', 'KG Design Studio', 'UI Designer', 'Designed interfaces for web and mobile applications across various industries including fintech, healthcare, and e-commerce.', ARRAY['Sketch', 'Adobe XD', 'HTML/CSS', 'Responsive Design', 'Mobile UI', 'Wireframing'], 3)
    `);
  }
}
