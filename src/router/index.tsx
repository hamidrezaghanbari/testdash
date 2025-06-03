import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import { Loading } from '@/components/atoms';
import { FullScreenLayout } from '@/layouts/FullScreenLayout';
import { NotFound, Unauthorized } from '@/utils';

import { ErrorBoundary } from './error';
import {
  Account,
  Campaigns,
  Events,
  PagesScreens,
  Products,
  Root,
  RootRedirection,
  Segment,
} from './handlers';
import { lazyLoad } from './helpers';
import { domainGuardLoader, rootLoader } from './loaders';
import { campaignsChildren, eventsChildren, pagesScreensChildren, segmentChildren } from './routes';

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
        path: 'events',
        loader: domainGuardLoader,
        children: eventsChildren,
        hasErrorBoundary: true,
      },
      {
        path: 'campaigns',
        loader: domainGuardLoader,
        children: campaignsChildren,
        hasErrorBoundary: true,
      },
      {
        path: 'segment',
        loader: domainGuardLoader,
        children: segmentChildren,
        hasErrorBoundary: true,
      },
      {
        path: 'pages-screens',
        loader: domainGuardLoader,
        children: pagesScreensChildren,
        hasErrorBoundary: true,
      },
    ],
  },

  {
    path: '*',
    element: <Navigate to="/events" />,
  },
]);

export { router };
