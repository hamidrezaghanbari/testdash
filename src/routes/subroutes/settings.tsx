import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const settingsChildren: TRoutes[] = [
  {
    path: 'channel',
    title: 'channel',
    icon: 'server-06',
    index: true,
    permissions: [],
  },
  {
    path: 'sdk',
    title: 'sdk',
    icon: 'layers-three-01',
    permissions: [],
  },
  {
    path: 'webhook',
    title: 'webhook',
    icon: 'Webhook',
    permissions: [],
  },
  {
    path: 'auditLog',
    title: 'audit log',
    icon: 'file-search-02',
    permissions: [],
  },
  {
    path: 'restApi',
    title: 'rest api',
    icon: 'file-lock-02',
    permissions: [],
  },
  {
    path: 'team',
    title: 'team',
    icon: 'users-01',
    permissions: [],
  },
  {
    path: 'billing',
    title: 'billing',
    icon: 'receipt',
    permissions: [],
  },
  {
    path: '*',
    element: <Navigate to="/settings/channel" />,
  },
];

export { settingsChildren };
