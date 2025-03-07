import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../../helpers';
import { missmatch } from '../../loaders';

const settingsChildren: RouteObject[] = [
  { index: true, element: <Navigate to="channels" replace /> },
  { path: 'channels', lazy: lazyLoad('settings/channel') },
  { path: 'sdk', lazy: lazyLoad('settings/sdk') },
  { path: 'webhook', lazy: lazyLoad('settings/webhook') },
  {
    path: 'auditLog',
    lazy: lazyLoad('settings/auditLog'),
  },
  {
    path: 'restApi',
    lazy: lazyLoad('settings/restApi'),
  },
  { path: 'team', lazy: lazyLoad('settings/team') },
  { path: 'billing', lazy: lazyLoad('settings/billing') },
  {
    path: '*',
    loader: missmatch('settings/channels'),
  },
];

export { settingsChildren };
