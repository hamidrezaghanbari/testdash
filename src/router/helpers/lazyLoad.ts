import { ComponentType } from 'react';
import { LazyRouteFunction, RouteObject } from 'react-router-dom';

import { ErrorBoundary } from '../error';
import { LazyFallback } from './lazyFallback';

type DefaultJSX = { default: ComponentType };

function lazyLoad(name: string): LazyRouteFunction<RouteObject> {
  const pages = import.meta.glob<DefaultJSX>('@/pages/**/index.tsx');

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
