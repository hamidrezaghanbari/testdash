import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { DEFAULT_QUERY_CONFIG } from './constants';
import router from './routes';

const client = new QueryClient(DEFAULT_QUERY_CONFIG);

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
