import { useNotify } from '@smartech/ui';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function LazyFallback() {
  const { open, close } = useNotify();

  useEffect(() => {
    const id = open({ title: 'Redirect due to issue', type: 'error' });

    return () => close(id);
  }, []);

  return <Navigate to="/" replace />;
}

export { LazyFallback };
