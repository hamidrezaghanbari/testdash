import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../helpers';
import { captchaLoader } from '../loaders';

const campaignsChildren: RouteObject[] = [
  {
    id: 'campaigns-list',
    path: '',
    lazy: lazyLoad('campaigns'),
    loader: captchaLoader,
  },
];

export { campaignsChildren };
