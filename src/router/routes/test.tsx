import { RouteObject } from 'react-router-dom';

import { lazyLoad } from '@/router/helpers/lazyLoad';

export const testRoutes: RouteObject[] = [
  {
    path: '/test',
    lazy: lazyLoad('test'),
  },
];
