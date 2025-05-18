import { NotificationProvider } from '@smartech/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { keycloak, keycloakInit } from './auth/keyclerk';
import { DEFAULT_QUERY_CONFIG } from './constants';
import { router } from './router';

const client = new QueryClient(DEFAULT_QUERY_CONFIG);

function App() {
  useEffect(() => {
    keycloakInit.then((authenticated) => {
      if (!authenticated) {
        keycloak.login();
      }
    });
  }, []);

  return (
    <QueryClientProvider client={client}>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
