import { LazyRouteFunction, RouteObject } from 'react-router-dom';

import { ErrorBoundary } from '$/components';

function lazyLoad(name: string): LazyRouteFunction<RouteObject> {
  return async () => {
    const { default: Component } = await import(`$/pages/${name}/index.tsx`);

    return {
      Component,
      ErrorBoundary,
    };
  };
}

export { lazyLoad };
