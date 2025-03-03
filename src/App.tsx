import { NotificationProvider } from '@smartech/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'motion/react';
import { RouterProvider } from 'react-router-dom';

import { DEFAULT_QUERY_CONFIG } from './constants';
import { router } from './routes';

const client = new QueryClient(DEFAULT_QUERY_CONFIG);

function App() {
  return (
    <QueryClientProvider client={client}>
      <NotificationProvider>
        <AnimatePresence initial mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
