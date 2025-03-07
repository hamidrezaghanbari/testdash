import { useNotify } from '@smartech/ui';
import { ComponentType, useEffect } from 'react';
import { LazyRouteFunction, Navigate, RouteObject } from 'react-router-dom';

import { ErrorBoundary } from '../error';

type DefaultJSX = { default: ComponentType };

function LazyFallback() {
  const { open, close } = useNotify();

  useEffect(() => {
    const id = open({ title: 'Redirect due to issue', type: 'error' });

    return () => close(id);
  }, []);

  return <Navigate to="/" replace />;
}

function lazyLoad(name: string): LazyRouteFunction<RouteObject> {
  const pages = import.meta.glob<DefaultJSX>('$/pages/**/index.tsx');

  const path = `/src/pages/${name}/index.tsx`;

  return async () => {
    if (pages[path]) {
      const { default: Component } = await pages[path]();

      return { Component, ErrorBoundary, hasErrorBoundary: true };
    }

    return { Component: LazyFallback };
  };
}

export { lazyLoad };
