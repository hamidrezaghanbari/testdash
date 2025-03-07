import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../../helpers';
import { missmatch } from '../../loaders';

const insightsChildren: RouteObject[] = [
  { index: true, element: <Navigate to="overview" replace /> },
  {
    path: 'overview',
    lazy: lazyLoad('insights/overview'),
  },
  {
    path: 'journey',
    lazy: lazyLoad('insights/journey'),
  },
  {
    path: 'relays',
    lazy: lazyLoad('insights/relays'),
  },
  {
    path: '*',
    loader: missmatch('insights/overview'),
  },
];

export { insightsChildren };
