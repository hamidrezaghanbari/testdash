import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const channelsChildren: TRoutes[] = [
  {
    path: 'push',
    title: 'push',
    icon: 'notification-message',
    index: true,
  },
  {
    path: 'webPush',
    title: 'web push',
    icon: 'notification-box',
  },
  {
    path: 'sms',
    title: 'sms',
    icon: 'message-dots-square',
  },
  {
    path: 'email',
    title: 'email',
    icon: 'mail-01',
  },
  {
    path: 'custom',
    title: 'custom channel',
    icon: 'dataflow-04',
  },
  {
    path: 'whatsapp',
    title: 'whatsapp',
    icon: 'whatsapp-line',
  },
  {
    path: 'telegram',
    title: 'telegram',
    icon: 'telegram-line',
  },
  {
    path: '*',
    element: <Navigate to="/channels/push" />,
  },
];

export { channelsChildren };
