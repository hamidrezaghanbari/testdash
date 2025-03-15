import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '@/router/helpers';
import { campaignLoader, channelLoader } from '@/router/loaders';

const createChannelRoutes = (id: string, path: string): RouteObject => ({
  path,
  children: [
    { index: true, element: <Navigate to="campaigns" replace /> },
    {
      id,
      path: ':campaignId',
      loader: channelLoader,
      children: [
        { index: true, element: <Navigate to="audience" replace /> },
        { path: ':step', lazy: lazyLoad(`channels/${path}/details`) },
      ],
    },
    {
      path: 'campaigns',
      id: [id, 'CAMPAIGN'].join(':'),
      loader: campaignLoader,
      lazy: lazyLoad(`channels/${path}/campaigns`),
    },
  ],
});

export { createChannelRoutes };
