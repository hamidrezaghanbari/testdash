import { RouteObject } from 'react-router-dom';

import { ProductRedirection } from '@/router/handlers';
import { lazyLoad } from '@/router/helpers';
import { usersLoader } from '@/router/loaders/users';

import { analyticsChildren } from './analytics';
import { channelsChildren } from './channels';
import { dataPlatformChildren } from './dataPlatform';
import { insightsChildren } from './insights';
import { personalizationChildren } from './personalization';
import { segmentChildren } from './segment';
import { settingsChildren } from './settings';

const productChildren: RouteObject[] = [
  { index: true, Component: ProductRedirection },
  {
    path: ':productId',
    children: [
      {
        index: true,
        lazy: lazyLoad('dashboard'),
      },
      {
        id: 'users',
        path: 'users',
        loader: usersLoader,
        lazy: lazyLoad('user'),
      },
      {
        path: 'analytics',
        children: analyticsChildren,
      },
      {
        path: 'segment',
        children: segmentChildren,
      },
      {
        path: 'dataPlatform',
        children: dataPlatformChildren,
      },
      {
        path: 'insights',
        children: insightsChildren,
      },

      {
        path: 'channels',
        children: channelsChildren,
      },
      {
        path: 'personalization',
        children: personalizationChildren,
      },
      {
        path: 'settings',
        children: settingsChildren,
      },
    ],
  },
];

export { productChildren };
