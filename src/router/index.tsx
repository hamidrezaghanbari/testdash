import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import { Loading } from '@/components/atoms';
import { FullScreenLayout } from '@/layouts/FullScreenLayout';
import { NotFound, Unauthorized } from '@/utils';

import { ErrorBoundary } from './error';
import { Account, Events, Root, RootRedirection } from './handlers';
import { lazyLoad } from './helpers';
import { accountLoader, rootLoader } from './loaders';
import { accountChildren, backOfficeChildren, eventsChildren, productChildren } from './routes';

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
    path: '/events',
    id: 'events',
    Component: Events,
    loader: accountLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: eventsChildren,
  },
  {
    path: '/fullscreen',
    element: (
      <FullScreenLayout>
        <Outlet />
      </FullScreenLayout>
    ),
    children: [
      {
        path: 'invoice-preview/:id',
        lazy: lazyLoad('backOffice/financial/invoice-list-preview'),
      },
      // Add more full-screen routes here
    ],
  },
  {
    path: '*',
    element: <Navigate to="/product" />,
  },
]);

export { router };
