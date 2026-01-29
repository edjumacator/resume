import type { GraphQLContext } from '../../types/context.js';
import { Experience } from '../../entities/Experience.js';

const MONTH_MAP: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11,
};

function parseDate(dateStr: string): Date {
  const normalized = dateStr.trim().toLowerCase();

  if (normalized === 'present' || normalized === 'current') {
    return new Date();
  }

  // Try "Month Year" format (e.g., "June 2023")
  const monthYearMatch = normalized.match(/^([a-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const month = MONTH_MAP[monthYearMatch[1]];
    const year = parseInt(monthYearMatch[2], 10);
    if (month !== undefined) {
      return new Date(year, month, 1);
    }
  }

  // Try year-only format (e.g., "2020")
  const yearMatch = normalized.match(/^(\d{4})$/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[1], 10), 0, 1);
  }

  // Fallback to Date constructor
  return new Date(dateStr);
}

function calculateYears(startDate: string, endDate: string): number {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const diffMs = end.getTime() - start.getTime();
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.round(years); // Round to nearest whole number
}

// Extended type for experiences with pre-computed cumulative skill years
type SkillYearsData = { years: number; category: string };
type ExperienceWithCumulativeSkills = Experience & {
  _cumulativeSkillYears?: Map<string, SkillYearsData>;
};

export const experienceResolvers = {
  Query: {
    experiences: async (_: unknown, __: unknown, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Experience);
      const experiences = await repo.find({
        order: { sortOrder: 'ASC' },
        relations: ['skillEntities'],
      });

      // Build cumulative skill years map across all experiences (with category)
      const skillYearsMap = new Map<string, SkillYearsData>();
      for (const exp of experiences) {
        const years = calculateYears(exp.startDate, exp.endDate);
        // Use skillEntities if available, fall back to skills array
        const skills = exp.skillEntities?.length > 0
          ? exp.skillEntities.map((s) => ({ name: s.name, category: s.category }))
          : (exp.skills || []).map((name) => ({ name, category: 'Other' }));

        for (const skill of skills) {
          const existing = skillYearsMap.get(skill.name);
          skillYearsMap.set(skill.name, {
            years: (existing?.years || 0) + years,
            category: skill.category,
          });
        }
      }

      // Attach cumulative skillsWithYears map to each experience
      return experiences.map((exp) => ({
        ...exp,
        // Derive skills array from skillEntities for backward compatibility
        skills: exp.skillEntities?.length > 0
          ? exp.skillEntities.map((s) => s.name)
          : exp.skills,
        _cumulativeSkillYears: skillYearsMap,
      }));
    },
    experience: async (_: unknown, { id }: { id: string }, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Experience);
      return repo.findOneBy({ id });
    },
    aggregatedSkills: async (_: unknown, __: unknown, { dataSources }: GraphQLContext) => {
      const repo = dataSources.db.getRepository(Experience);
      const experiences = await repo.find({ relations: ['skillEntities'] });

      // Build cumulative skill years map across all experiences (with category)
      const skillYearsMap = new Map<string, SkillYearsData>();
      for (const exp of experiences) {
        const years = calculateYears(exp.startDate, exp.endDate);
        // Use skillEntities if available, fall back to skills array
        const skills = exp.skillEntities?.length > 0
          ? exp.skillEntities.map((s) => ({ name: s.name, category: s.category }))
          : (exp.skills || []).map((name) => ({ name, category: 'Other' }));

        for (const skill of skills) {
          const existing = skillYearsMap.get(skill.name);
          skillYearsMap.set(skill.name, {
            years: (existing?.years || 0) + years,
            category: skill.category,
          });
        }
      }

      // Convert map to array and sort by years descending
      return Array.from(skillYearsMap.entries())
        .map(([name, data]) => ({ name, years: data.years, category: data.category }))
        .sort((a, b) => b.years - a.years);
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
    skillsWithYears: (experience: ExperienceWithCumulativeSkills) => {
      const skillYearsMap = experience._cumulativeSkillYears;

      // Get skills from skillEntities if available, otherwise from skills array
      const skillNames = experience.skillEntities?.length > 0
        ? experience.skillEntities.map((s) => s.name)
        : (experience.skills || []);

      // If cumulative map is available (from experiences query), use it
      if (skillYearsMap) {
        return skillNames.map((skill) => {
          const data = skillYearsMap.get(skill);
          return {
            name: skill,
            years: data?.years || 0,
            category: data?.category || 'Other',
          };
        });
      }

      // Fallback for single experience query: use per-job duration
      const years = calculateYears(experience.startDate, experience.endDate);
      return skillNames.map((skill) => {
        const skillEntity = experience.skillEntities?.find((s) => s.name === skill);
        return {
          name: skill,
          years,
          category: skillEntity?.category || 'Other',
        };
      });
    },
  },
};
