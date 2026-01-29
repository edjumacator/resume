import { gql } from '@apollo/client/core';

export const GET_SERVICES = gql`
  query GetServices {
    services {
      id
      icon
      title
      description
      sortOrder
    }
  }
`;

export const GET_EXPERIENCES = gql`
  query GetExperiences {
    experiences {
      id
      startDate
      endDate
      company
      role
      description
      summary
      sortOrder
    }
    aggregatedSkills {
      name
      years
    }
  }
`;

export const GET_PROJECTS = gql`
  query GetProjects($category: String) {
    projects(category: $category) {
      id
      title
      category
      tools
      imageUrl
      link
      sortOrder
    }
    projectCategories
  }
`;

export const GET_TESTIMONIALS = gql`
  query GetTestimonials {
    testimonials {
      id
      name
      role
      company
      avatarUrl
      rating
      quote
      sortOrder
    }
  }
`;

export const SUBMIT_CONTACT = gql`
  mutation SubmitContact($input: ContactInput!) {
    submitContact(input: $input) {
      success
      message
      submission {
        id
        name
        email
        createdAt
      }
    }
  }
`;
