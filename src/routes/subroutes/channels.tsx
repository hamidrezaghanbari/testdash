import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const channelsChildren: TRoutes[] = [
  {
    path: 'push',
    title: 'push',
    icon: 'notification-message',
    index: true,
    permissions: [],
  },
  {
    path: 'webPush',
    title: 'web push',
    icon: 'notification-box',
    permissions: [],
  },
  {
    path: 'sms',
    title: 'sms',
    icon: 'message-dots-square',
    permissions: [],
  },
  {
    path: 'email',
    title: 'email',
    icon: 'mail-01',
    permissions: [],
  },
  {
    path: 'custom',
    title: 'custom channel',
    icon: 'dataflow-04',
    permissions: [],
  },
  {
    path: 'whatsapp',
    title: 'whatsapp',
    icon: 'whatsapp-line',
    permissions: [],
  },
  {
    path: 'telegram',
    title: 'telegram',
    icon: 'telegram-line',
    permissions: [],
  },
  {
    path: '*',
    element: <Navigate to="/channels/push" />,
  },
];

export { channelsChildren };
