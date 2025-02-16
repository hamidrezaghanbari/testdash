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
        path: routes.root.children.about.pathname,
        lazy: lazyLoad('about'),
      },
      {
        path: routes.root.children.contact.pathname,
        lazy: lazyLoad('contact'),
      },
    ],
  },
  // {
  //   path: routes.account.pathname,
  //   Component: Account,
  //   ErrorBoundary,
  //   HydrateFallback: null,
  //   loader: accountLoader,
  //   children: [
  //     {
  //       index: true,
  //       path: routes.account.pathname,
  //       element: <Navigate to={routes.account.navigateTo} />,
  //     },
  //     {
  //       path: routes.account.children.login.pathname,
  //       lazy: lazyLoad('login'),
  //     },
  //     {
  //       path: routes.account.children.register.pathname,
  //       lazy: lazyLoad('register'),
  //     },
  //     {
  //       path: '*',
  //       element: <Navigate to={routes.account.navigateTo} />,
  //     },
  //   ],
  // },
  {
    path: '*',
    element: <Navigate to="/product/1" />,
  },
]);

export { router };
