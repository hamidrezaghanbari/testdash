import { Navigate, RouteObject } from 'react-router-dom';

import { missmatch } from '../../loaders';
import { createChannelRoutes } from './helpers';

const channelsChildren: RouteObject[] = [
  { index: true, element: <Navigate to="push" replace /> },
  createChannelRoutes('PUSH', 'push'),
  createChannelRoutes('WEBPUSH', 'webPush'),
  createChannelRoutes('SMS', 'sms'),
  createChannelRoutes('EMAIL', 'email'),
  createChannelRoutes('CUSTOM', 'custom'),
  createChannelRoutes('WHATSAPP', 'whatsapp'),
  createChannelRoutes('TELEGRAM', 'telegram'),
  {
    path: '*',
    loader: missmatch('channels/push'),
  },
];

export { channelsChildren };
