import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useTabQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handler = useCallback(
    (tab: string) => {
      const params = new URLSearchParams(searchParams);

      params.set('tab', tab);

      setSearchParams(params, { replace: true, viewTransition: true });
    },
    [searchParams],
  );

  return { handler };
};
