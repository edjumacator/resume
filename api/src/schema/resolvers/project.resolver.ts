import type { GraphQLContext } from '../../types/context.js';
import { Project } from '../../entities/Project.js';

export const projectResolvers = {
  Query: {
    projects: async (
      _: unknown,
      { category }: { category?: string },
      { dataSources }: GraphQLContext
    ) => {
      const repo = dataSources.db.getRepository(Project);
      if (category) {
        return repo.find({
          where: { category },
          order: { sortOrder: 'ASC' },
        });
      }
      return repo.find({ order: { sortOrder: 'ASC' } });
    },
    project: async (_: unknown, { id }: { id: string }, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Project);
      return repo.findOneBy({ id });
    },
    projectCategories: async (_: unknown, __: unknown, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Project);
      const projects = await repo
        .createQueryBuilder('project')
        .select('DISTINCT project.category', 'category')
        .orderBy('category', 'ASC')
        .getRawMany();
      return projects.map((p) => p.category);
    },
  },
  Project: {
    __resolveReference: async (
      reference: { id: string },
      { dataSources }: GraphQLContext
    ) => {
      const repo = dataSources.db.getRepository(Project);
      return repo.findOneBy({ id: reference.id });
    },
  },
};
