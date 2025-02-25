import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const analyticsChildren: TRoutes[] = [
  {
    path: 'event',
    title: 'event',
    icon: 'rocket-01',
    index: true,
  },
  {
    path: 'funnel',
    title: 'funnel',
    icon: 'filter-funnel-01',
  },
  {
    path: 'cohort',
    title: 'cohort',
    icon: 'data',
  },
  {
    path: 'uninstall',
    title: 'uninstall',
    icon: 'log-out-01',
  },
  {
    path: '*',
    element: <Navigate to="/analytics/event" />,
  },
];

export { analyticsChildren };
