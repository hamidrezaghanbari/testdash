import { QueryClientConfig } from '@tanstack/react-query';

const DEFAULT_QUERY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: { retry: false },
  },
};

export { DEFAULT_QUERY_CONFIG };
