import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../helpers';
import { captchaLoader } from '../loaders';

const segmentChildren: RouteObject[] = [
  {
    id: 'segment-list',
    path: '',
    lazy: lazyLoad('segment'),
    // loader: captchaLoader,
  },
];

export { segmentChildren };
