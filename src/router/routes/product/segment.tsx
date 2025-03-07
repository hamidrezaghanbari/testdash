import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../../helpers';
import { missmatch } from '../../loaders';

const segmentChildren: RouteObject[] = [
  { index: true, element: <Navigate to="live" replace /> },
  {
    path: 'live',
    lazy: lazyLoad('segment/live'),
  },
  {
    path: 'static',
    lazy: lazyLoad('segment/static'),
  },
  {
    path: '*',
    loader: missmatch('segment/live'),
  },
];

export { segmentChildren };
