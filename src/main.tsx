import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store } from './store/store';
import { theme } from './theme/theme';
import { apolloClient } from './graphql/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  </StrictMode>
);
