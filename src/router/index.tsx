import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Loading } from '$/components/atoms';

import { ErrorBoundary } from './error';
import { Account, Root, RootRedirection } from './handlers';
import { lazyLoad } from './helpers';
import { accountLoader, rootLoader } from './loaders';
import { accountChildren, backOfficeChildren, productChildren } from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    Component: Root,
    loader: rootLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: [
      {
        index: true,
        Component: RootRedirection,
      },
      {
        path: 'product',
        children: productChildren,
      },
      {
        path: 'backOffice',
        children: backOfficeChildren,
      },
      {
        path: 'notFound',
        lazy: lazyLoad('fallbacks/notFound'),
        hasErrorBoundary: false,
      },
      {
        path: 'unauthorized',
        lazy: lazyLoad('fallbacks/unauthorized'),
        hasErrorBoundary: false,
      },
    ],
  },
  {
    path: '/account',
    id: 'account',
    Component: Account,
    loader: accountLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: accountChildren,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export { router };
