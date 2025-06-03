import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import { Loading } from '@/components/atoms';
import { FullScreenLayout } from '@/layouts/FullScreenLayout';
import PagesScreens from '@/pages/pages-screens';
import { NotFound, Unauthorized } from '@/utils';

import { ErrorBoundary } from './error';
import { Account, Campaigns, Events, Products, Root, RootRedirection, Segment } from './handlers';
import { lazyLoad } from './helpers';
import { accountLoader, domainGuardLoader, protectedRouteLoader, rootLoader } from './loaders';
import {
  accountChildren,
  backOfficeChildren,
  campaignsChildren,
  eventsChildren,
  pagesScreensChildren,
  productChildren,
  productsChildren,
  segmentChildren,
} from './routes';

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
        loader: domainGuardLoader,
        children: productChildren,
      },
      {
        path: 'backOffice',
        loader: domainGuardLoader,
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
    loader: protectedRouteLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: accountChildren,
  },
  {
    path: '/events',
    id: 'events',
    Component: Events,
    loader: protectedRouteLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: eventsChildren,
  },
  {
    path: '/campaigns',
    id: 'campaigns',
    Component: Campaigns,
    loader: protectedRouteLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: campaignsChildren,
  },
  // {
  //   path: '/pages-screens',
  //   id: 'pages-screens',
  //   Component: PagesScreens,
  //   loader: protectedRouteLoader,
  //   ErrorBoundary,
  //   HydrateFallback: Loading,
  //   hasErrorBoundary: true,
  //   children: pagesScreensChildren,
  // },
  {
    path: '/segment',
    id: 'segment',
    Component: Segment,
    loader: protectedRouteLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: segmentChildren,
  },
  {
    path: '/products',
    id: 'products',
    Component: Products,
    loader: accountLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: productsChildren,
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
