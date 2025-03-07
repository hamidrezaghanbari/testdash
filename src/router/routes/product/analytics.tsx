import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../../helpers';
import { missmatch } from '../../loaders';

const analyticsChildren: RouteObject[] = [
  { index: true, element: <Navigate to="event" replace /> },
  { path: 'event', lazy: lazyLoad('analytics/event') },
  {
    path: 'funnel',
    lazy: lazyLoad('analytics/funnel'),
  },
  { path: 'cohort', lazy: lazyLoad('analytics/cohort') },
  {
    path: 'uninstall',
    lazy: lazyLoad('analytics/uninstall'),
  },
  {
    path: '*',
    loader: missmatch('/analytics/event'),
  },
];

export { analyticsChildren };
