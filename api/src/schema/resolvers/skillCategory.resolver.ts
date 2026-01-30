import type { GraphQLContext } from '../../types/context.js';
import { SkillCategory } from '../../entities/SkillCategory.js';

export const skillCategoryResolvers = {
  Query: {
    skillCategories: async (_: unknown, __: unknown, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(SkillCategory);
      return repo.find({ order: { sortOrder: 'ASC' } });
    },
  },
  SkillCategory: {
    __resolveReference: async (
      reference: { id: string },
      { dataSources }: GraphQLContext
    ) => {
      const repo = dataSources.db.getRepository(SkillCategory);
      return repo.findOneBy({ id: reference.id });
    },
  },
};
