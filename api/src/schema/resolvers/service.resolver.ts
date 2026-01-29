import type { GraphQLContext } from '../../types/context.js';
import { Service } from '../../entities/Service.js';

export const serviceResolvers = {
  Query: {
    services: async (_: unknown, __: unknown, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Service);
      return repo.find({ order: { sortOrder: 'ASC' } });
    },
    service: async (_: unknown, { id }: { id: string }, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Service);
      return repo.findOneBy({ id });
    },
  },
  Service: {
    __resolveReference: async (
      reference: { id: string },
      { dataSources }: GraphQLContext
    ) => {
      const repo = dataSources.db.getRepository(Service);
      return repo.findOneBy({ id: reference.id });
    },
  },
};
