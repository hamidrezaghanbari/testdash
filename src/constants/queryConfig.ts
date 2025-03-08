import { QueryClientConfig } from '@tanstack/react-query';

const DEFAULT_QUERY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
    mutations: { retry: false },
  },
};

export { DEFAULT_QUERY_CONFIG };
