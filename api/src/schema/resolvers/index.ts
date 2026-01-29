import { serviceResolvers } from './service.resolver.js';
import { experienceResolvers } from './experience.resolver.js';
import { projectResolvers } from './project.resolver.js';
import { testimonialResolvers } from './testimonial.resolver.js';
import { contactResolvers } from './contact.resolver.js';

export const resolvers = {
  Query: {
    ...serviceResolvers.Query,
    ...experienceResolvers.Query,
    ...projectResolvers.Query,
    ...testimonialResolvers.Query,
  },
  Mutation: {
    ...contactResolvers.Mutation,
  },
  Service: serviceResolvers.Service,
  Experience: experienceResolvers.Experience,
  Project: projectResolvers.Project,
  Testimonial: testimonialResolvers.Testimonial,
  ContactSubmission: contactResolvers.ContactSubmission,
};
