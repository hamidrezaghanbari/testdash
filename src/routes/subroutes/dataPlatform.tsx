import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const dataPlatformChildren: TRoutes[] = [
  {
    path: 'management',
    title: 'data management',
    icon: 'bar-chart-square-02',
    index: true,
  },
  {
    path: 'uploadData',
    title: 'upload data',
    icon: 'upload-cloud-01',
  },
  {
    path: 'alert',
    title: 'alert',
    icon: 'bell-ringing-03',
  },
  {
    path: '*',
    element: <Navigate to="/dataPlatform/management" />,
  },
];

export { dataPlatformChildren };
