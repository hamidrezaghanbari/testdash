import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../../helpers';
import { missmatch } from '../../loaders';

const dataPlatformChildren: RouteObject[] = [
  { index: true, element: <Navigate to="management" replace /> },
  {
    path: 'management',
    lazy: lazyLoad('dataPlatform/management'),
  },
  {
    path: 'uploadData',
    lazy: lazyLoad('dataPlatform/uploadData'),
  },
  { path: 'alert', lazy: lazyLoad('dataPlatform/alert') },
  {
    path: '*',
    loader: missmatch('dataPlatform/management'),
  },
];

export { dataPlatformChildren };
