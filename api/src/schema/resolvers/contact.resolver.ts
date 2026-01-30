import type { GraphQLContext, ContactInput } from '../../types/context.js';
import { ContactSubmission } from '../../entities/ContactSubmission.js';

export const contactResolvers = {
  Mutation: {
    submitContact: async (
      _: unknown,
      { input }: { input: ContactInput },
      { dataSources }: GraphQLContext
    ) => {
      const repo = dataSources.db.getRepository(ContactSubmission);

      if (!input.privacyAccepted) {
        return {
          success: false,
          message: 'You must accept the privacy policy to submit the form.',
          submission: null,
        };
      }

      const submission = repo.create({
        name: input.name,
        email: input.email,
        company: input.company,
        message: input.message,
        privacyAccepted: input.privacyAccepted,
      });

      await repo.save(submission);

      return {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.',
        submission: {
          ...submission,
          createdAt: submission.createdAt.toISOString(),
        },
      };
    },
  },
  ContactSubmission: {
    __resolveReference: async (
      reference: { id: string },
      { dataSources }: GraphQLContext
    ) => {
      const repo = dataSources.db.getRepository(ContactSubmission);
      const submission = await repo.findOneBy({ id: reference.id });
      if (submission) {
        return {
          ...submission,
          createdAt: submission.createdAt.toISOString(),
        };
      }
      return null;
    },
  },
};
