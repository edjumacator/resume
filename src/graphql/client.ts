import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_URL || 'http://localhost:4001/graphql',
  }),
  cache: new InMemoryCache(),
});
