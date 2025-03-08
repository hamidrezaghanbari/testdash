import { RouteObject } from 'react-router-dom';

import { ProductRedirection } from '@/router/handlers';
import { lazyLoad } from '@/router/helpers';
import { productLoader } from '@/router/loaders';

import { analyticsChildren } from './analytics';
import { channelsChildren } from './channels';
import { dataPlatformChildren } from './dataPlatform';
import { insightsChildren } from './insights';
import { personalizationChildren } from './personalization';
import { segmentChildren } from './segment';
import { settingsChildren } from './settings';

const productChildren: RouteObject[] = [
  { id: 'product', index: true, loader: productLoader, Component: ProductRedirection },
  {
    path: ':productId',
    children: [
      {
        index: true,
        lazy: lazyLoad('dashboard'),
      },
      {
        path: 'users',
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
