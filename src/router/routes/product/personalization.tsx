import { Navigate, RouteObject } from 'react-router-dom';

import { missmatch } from '../../loaders';
import { createChannelRoutes } from './helpers';

const personalizationChildren: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="onSite" replace />,
  },
  createChannelRoutes('ONSITE', 'onSite', 'personalization'),
  createChannelRoutes('INAPP', 'inApp', 'personalization'),
  createChannelRoutes('SURVEY', 'survey', 'personalization'),
  {
    path: '*',
    loader: missmatch('personalization/onSite'),
  },
];

export { personalizationChildren };
