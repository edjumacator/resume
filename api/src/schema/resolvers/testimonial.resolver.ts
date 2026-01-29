import type { GraphQLContext } from '../../types/context.js';
import { Testimonial } from '../../entities/Testimonial.js';

export const testimonialResolvers = {
  Query: {
    testimonials: async (_: unknown, __: unknown, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Testimonial);
      return repo.find({ order: { sortOrder: 'ASC' } });
    },
    testimonial: async (_: unknown, { id }: { id: string }, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Testimonial);
      return repo.findOneBy({ id });
    },
  },
  Testimonial: {
    __resolveReference: async (
      reference: { id: string },
      { dataSources }: GraphQLContext
    ) => {
      const repo = dataSources.db.getRepository(Testimonial);
      return repo.findOneBy({ id: reference.id });
    },
  },
};
