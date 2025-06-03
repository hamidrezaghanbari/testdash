import { NotificationProvider } from '@smartech/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { keycloak, keycloakInit } from './auth/keyclerk';
import { DEFAULT_QUERY_CONFIG } from './constants';
import { router } from './router';
import { setupApiInterceptors } from './utils';

const client = new QueryClient(DEFAULT_QUERY_CONFIG);

function App() {
  // useEffect(() => {
  //   // Setup API interceptors

  //   keycloakInit.then((authenticated) => {
  //     if (!authenticated) {
  //       keycloak.login();
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setupApiInterceptors();
    Cookies.set('userUuid', '5b0d595e-a2b0-472e-8738-295eed652657', {
      expires: 7,
      secure: true,
      sameSite: 'Strict',
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
