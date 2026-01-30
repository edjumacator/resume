import graphqlTag from 'graphql-tag';
const gql = graphqlTag.default ?? graphqlTag;

export const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

  type Skill @key(fields: "id") {
    id: ID!
    name: String!
    category: String!
  }

  type SkillWithYears {
    name: String!
    years: Float!
    category: String
  }

  type Service @key(fields: "id") {
    id: ID!
    icon: String!
    title: String!
    description: String!
    category: String
    skills: [SkillWithYears!]!
    sortOrder: Int!
  }

  type Experience @key(fields: "id") {
    id: ID!
    startDate: String!
    endDate: String!
    company: String!
    role: String!
    description: String!
    summary: String
    skills: [String!]!
    skillsWithYears: [SkillWithYears!]!
    sortOrder: Int!
  }

  type Project @key(fields: "id") {
    id: ID!
    title: String!
    category: String!
    tools: [String!]!
    imageUrl: String!
    imageUrls: [String!]!
    link: String
    description: String
    githubUrl: String
    demoUrl: String
    featured: Boolean!
    startDate: String
    endDate: String
    sortOrder: Int!
  }

  type Testimonial @key(fields: "id") {
    id: ID!
    name: String!
    role: String!
    company: String!
    avatarUrl: String!
    rating: Int!
    quote: String!
    sortOrder: Int!
  }

  type SkillCategory @key(fields: "id") {
    id: ID!
    name: String!
    proficiency: Float!
    sortOrder: Int!
    color: String
  }

  type ContactSubmission @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
    company: String
    message: String!
    createdAt: String!
  }

  type Query {
    services: [Service!]!
    service(id: ID!): Service

    experiences: [Experience!]!
    experience(id: ID!): Experience
    aggregatedSkills: [SkillWithYears!]!

    projects(category: String): [Project!]!
    project(id: ID!): Project
    projectCategories: [String!]!
    featuredProjects: [Project!]!

    testimonials: [Testimonial!]!
    testimonial(id: ID!): Testimonial

    skillCategories: [SkillCategory!]!
  }

  input ContactInput {
    name: String!
    email: String!
    company: String
    message: String!
    privacyAccepted: Boolean!
  }

  type ContactResult {
    success: Boolean!
    message: String!
    submission: ContactSubmission
  }

  type Mutation {
    submitContact(input: ContactInput!): ContactResult!
  }
`;
