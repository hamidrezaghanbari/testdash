import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from 'motion/react';
import { RouterProvider } from 'react-router-dom';

import { DEFAULT_QUERY_CONFIG } from './constants';
import { RootLayout } from './layouts';
import { router } from './routes';

const client = new QueryClient(DEFAULT_QUERY_CONFIG);

function App() {
  return (
    <QueryClientProvider client={client}>
      <AnimatePresence initial mode="wait">
        <RootLayout>
          <RouterProvider router={router} />
        </RootLayout>
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;
