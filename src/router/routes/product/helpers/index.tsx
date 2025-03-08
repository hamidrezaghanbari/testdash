import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '@/router/helpers';
import { channelLoader } from '@/router/loaders';

const createChannelRoutes = (
  id: string,
  path: string,
  base: 'channels' | 'personalization' = 'channels',
): RouteObject => ({
  path,
  children: [
    { index: true, element: <Navigate to="campaigns" replace /> },
    {
      id,
      path: ':campaignId',
      loader: channelLoader,
      children: [
        { index: true, element: <Navigate to="audience" replace /> },
        { path: ':step', lazy: lazyLoad(`${base}/${path}/details`) },
      ],
    },
    { path: 'campaigns', lazy: lazyLoad(`${base}/${path}/campaigns`) },
  ],
});

export { createChannelRoutes };
