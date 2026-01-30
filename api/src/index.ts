import 'reflect-metadata';
import express, { RequestHandler } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { config } from 'dotenv';
import { AppDataSource } from './datasources/database.js';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers/index.js';
import type { GraphQLContext } from './types/context.js';

config();

async function main() {
  // Initialize database connection
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }

  // Build federated schema
  const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);

  // Create Apollo Server
  const server = new ApolloServer<GraphQLContext>({
    schema,
    introspection: true,
  });

  await server.start();

  // Create Express app
  const app = express();

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // GraphQL endpoint
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async (): Promise<GraphQLContext> => ({
        dataSources: {
          db: AppDataSource,
        },
      }),
    }) as unknown as RequestHandler
  );

  // Start server
  const port = parseInt(process.env.PORT || '4000');
  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    console.log(`💚 Health check at http://localhost:${port}/health`);
  });
}

main().catch((error) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});
