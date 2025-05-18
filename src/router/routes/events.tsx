import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../helpers';
import { captchaLoader } from '../loaders';

const eventsChildren: RouteObject[] = [
  {
    id: 'events-list',
    path: '',
    lazy: lazyLoad('events'),
    loader: captchaLoader,
  },
];

export { eventsChildren };
