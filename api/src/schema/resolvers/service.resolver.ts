import type { GraphQLContext } from '../../types/context.js';
import { Service } from '../../entities/Service.js';
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

  const monthYearMatch = normalized.match(/^([a-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const month = MONTH_MAP[monthYearMatch[1]];
    const year = parseInt(monthYearMatch[2], 10);
    if (month !== undefined) {
      return new Date(year, month, 1);
    }
  }

  const yearMatch = normalized.match(/^(\d{4})$/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[1], 10), 0, 1);
  }

  return new Date(dateStr);
}

function calculateYears(startDate: string, endDate: string): number {
  const start = parseDate(startDate);
  const end = parseDate(endDate);
  const diffMs = end.getTime() - start.getTime();
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.round(years);
}

type SkillYearsData = { years: number; category: string };

// Cache for aggregated skills to avoid repeated DB queries
let skillsCache: { skills: Map<string, SkillYearsData>; timestamp: number } | null = null;
const CACHE_TTL = 60000; // 1 minute

async function getAggregatedSkills(dataSources: GraphQLContext['dataSources']): Promise<Map<string, SkillYearsData>> {
  const now = Date.now();
  if (skillsCache && (now - skillsCache.timestamp) < CACHE_TTL) {
    return skillsCache.skills;
  }

  const repo = dataSources.db.getRepository(Experience);
  const experiences = await repo.find({ relations: ['skillEntities'] });

  const skillYearsMap = new Map<string, SkillYearsData>();
  for (const exp of experiences) {
    const years = calculateYears(exp.startDate, exp.endDate);
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

  skillsCache = { skills: skillYearsMap, timestamp: now };
  return skillYearsMap;
}

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
    skills: async (service: Service, _: unknown, { dataSources }: GraphQLContext) => {
      if (!service.category) {
        return [];
      }

      const skillsMap = await getAggregatedSkills(dataSources);

      // Filter skills by the service's category and sort by years descending
      const categorySkills = Array.from(skillsMap.entries())
        .filter(([, data]) => data.category === service.category)
        .map(([name, data]) => ({ name, years: data.years, category: data.category }))
        .sort((a, b) => b.years - a.years)
        .slice(0, 5); // Return top 5 skills

      return categorySkills;
    },
  },
};
