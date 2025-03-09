import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Loading } from '@/components/atoms';
import { NotFound, Unauthorized } from '@/pages/fallbacks';

import { ErrorBoundary } from './error';
import { Account, Root, RootRedirection } from './handlers';
import { accountLoader, rootLoader } from './loaders';
import { accountChildren, backOfficeChildren, productChildren } from './routes';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    loader: rootLoader,
    Component: Root,
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
        Component: NotFound,
        hasErrorBoundary: false,
      },
      {
        path: 'unauthorized',
        Component: Unauthorized,
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
