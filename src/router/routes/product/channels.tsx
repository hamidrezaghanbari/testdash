import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../../helpers';
import { missmatch } from '../../loaders';

const channelsChildren: RouteObject[] = [
  { index: true, element: <Navigate to="push" replace /> },
  { path: 'push', lazy: lazyLoad('channels/relays') },
  {
    path: 'webPush',
    lazy: lazyLoad('channels/webPush'),
  },
  { path: 'sms', lazy: lazyLoad('channels/sms') },
  { path: 'email', lazy: lazyLoad('channels/email') },
  {
    path: 'custom',
    lazy: lazyLoad('channels/custom'),
  },
  {
    path: 'whatsapp',
    lazy: lazyLoad('channels/whatsapp'),
  },
  {
    path: 'telegram',
    lazy: lazyLoad('channels/telegram'),
  },
  {
    path: '*',
    loader: missmatch('channels/push'),
  },
];

export { channelsChildren };
