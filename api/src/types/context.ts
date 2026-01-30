import type { DataSource } from 'typeorm';

export interface GraphQLContext {
  dataSources: {
    db: DataSource;
  };
}

export interface ContactInput {
  name: string;
  email: string;
  company?: string;
  message: string;
  privacyAccepted: boolean;
}
