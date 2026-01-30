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
    featuredProjects: async (_: unknown, __: unknown, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Project);
      return repo.find({
        where: { featured: true },
        order: { sortOrder: 'ASC' },
      });
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
    imageUrl: (parent: Project) => {
      // Return first image from imageUrls array, fallback to imageUrl field
      if (parent.imageUrls && parent.imageUrls.length > 0) {
        return parent.imageUrls[0];
      }
      return parent.imageUrl;
    },
    imageUrls: (parent: Project) => {
      // Return imageUrls array, fallback to wrapping single imageUrl
      if (parent.imageUrls && parent.imageUrls.length > 0) {
        return parent.imageUrls;
      }
      return parent.imageUrl ? [parent.imageUrl] : [];
    },
  },
};
