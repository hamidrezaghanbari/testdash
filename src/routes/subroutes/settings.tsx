import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const settingsChildren: TRoutes[] = [
  {
    path: 'channel',
    title: 'channel',
    icon: 'server-06',
    index: true,
  },
  {
    path: 'sdk',
    title: 'sdk',
    icon: 'layers-three-01',
  },
  {
    path: 'webhook',
    title: 'webhook',
    icon: 'Webhook',
  },
  {
    path: 'auditLog',
    title: 'audit log',
    icon: 'file-search-02',
  },
  {
    path: 'restApi',
    title: 'rest api',
    icon: 'file-lock-02',
  },
  {
    path: 'team',
    title: 'team',
    icon: 'users-01',
  },
  {
    path: 'billing',
    title: 'billing',
    icon: 'receipt',
  },
  {
    path: '*',
    element: <Navigate to="/settings/channel" />,
  },
];

export { settingsChildren };
