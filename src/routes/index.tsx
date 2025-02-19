import { LazyRouteFunction, Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './errorBoundary';
import { Root } from './handlers';
import { rootLoader } from './loaders';
import { routerChildren, routes } from './routes';

function lazy(name: string): LazyRouteFunction<RouteObject> {
  return async () => {
    const { default: Component } = await import(`$/pages/${name}/index.tsx`);

    return {
      Component,
      ErrorBoundary,
    };
  };
}

const router = createBrowserRouter([
  {
    path: routes.root.pathname,
    id: 'root',
    Component: Root,
    loader: rootLoader,
    ErrorBoundary,
    HydrateFallback: null,
    hasErrorBoundary: true,
    children: [
      {
        index: true,
        path: routes.root.pathname,
        lazy: lazy('dashboard'),
      },
      {
        path: 'about',
        lazy: lazy('about'),
      },
      {
        path: 'contact',
        lazy: lazy('contact'),
      },
    ],
  },
  // {
  //   path: '/account',
  //   Component: Account,
  //   ErrorBoundary,
  //   HydrateFallback: null,
  //   loader: accountLoader,
  //   children: [
  //     {
  //       index: true,
  //       path: '/account',
  //       element: <Navigate to="/login" />,
  //     },
  //     {
  //       path: 'login',
  //       lazy: lazyLoad('login'),
  //     },
  //     {
  //       path: 'register',
  //       lazy: lazyLoad('register'),
  //     },
  //     {
  //       path: '*',
  //       element: <Navigate to="login" />,
  //     },
  //   ],
  // },
  {
    path: '*',
    element: <Navigate to={routes.root.pathname} />,
  },
]);

export { router };
