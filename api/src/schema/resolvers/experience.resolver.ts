import type { GraphQLContext } from '../../types/context.js';
import { Experience } from '../../entities/Experience.js';

export const experienceResolvers = {
  Query: {
    experiences: async (_: unknown, __: unknown, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Experience);
      return repo.find({ order: { sortOrder: 'ASC' } });
    },
    experience: async (_: unknown, { id }: { id: string }, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Experience);
      return repo.findOneBy({ id });
    },
  },
  Experience: {
    __resolveReference: async (
      reference: { id: string },
      { dataSources }: GraphQLContext
    ) => {
      const repo = dataSources.db.getRepository(Experience);
      return repo.findOneBy({ id: reference.id });
    },
  },
};
