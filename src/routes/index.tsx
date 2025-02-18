import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './errorBoundary';
import { Root } from './handlers';
import { lazyLoad, rootLoader } from './loaders';
import { routes } from './routes';

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
        lazy: lazyLoad('dashboard'),
      },
      {
        path: 'about',
        lazy: lazyLoad('about'),
      },
      {
        path: 'contact',
        lazy: lazyLoad('contact'),
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
