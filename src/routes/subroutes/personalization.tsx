import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const webPersonalizationChildren: TRoutes[] = [
  {
    path: 'onSite',
    title: 'on site',
    icon: 'monitor-02',
    index: true,
  },
  {
    path: 'survey',
    title: 'survey',
    icon: 'bar-chart-square-02',
  },
  {
    path: '*',
    element: <Navigate to="/personalization/onSite" />,
  },
];

const appPersonalizationChildren: TRoutes[] = [
  {
    path: 'inApp',
    title: 'in app',
    icon: 'phone-02',
    index: true,
  },
  {
    path: '*',
    element: <Navigate to="/personalization/inApp" />,
  },
];

export { webPersonalizationChildren, appPersonalizationChildren };
