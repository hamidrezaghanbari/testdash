import { Navigate, RouteObject } from 'react-router-dom';

import { missmatch } from '../../loaders';
import { createChannelRoutes } from './helpers';

const personalizationChildren: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="onSite" replace />,
  },
  createChannelRoutes('ONSITE', 'onSite'),
  createChannelRoutes('INAPP', 'inApp'),
  createChannelRoutes('SURVEY', 'survey'),
  {
    path: '*',
    loader: missmatch('personalization/onSite'),
  },
];

export { personalizationChildren };
