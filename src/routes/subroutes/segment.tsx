import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const segmentChildren: TRoutes[] = [
  {
    path: 'live',
    title: 'live segment',
    icon: 'bar-chart-square-02',
    index: true,
  },
  {
    path: 'static',
    title: 'static segment',
    icon: 'bar-chart-square-02',
  },
  {
    path: '*',
    element: <Navigate to="/segment/live" />,
  },
];

export { segmentChildren };
