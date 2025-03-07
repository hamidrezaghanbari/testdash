import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../../helpers';
import { missmatch, personalizationLoader } from '../../loaders';

const personalizationChildren: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="onSite" replace />,
  },
  {
    path: 'onSite',
    children: [
      {
        index: true,
        element: <Navigate to="campaigns" replace />,
      },
      {
        id: 'onSite',
        path: ':campaignId',
        loader: personalizationLoader,
        children: [
          { index: true, element: <Navigate to="audience" replace /> },
          { path: ':step', lazy: lazyLoad('personalization/onSite/details') },
        ],
      },
      { path: 'campaigns', lazy: lazyLoad('personalization/onSite/campaigns') },
    ],
  },
  {
    path: 'survey',
    children: [
      {
        index: true,
        element: <Navigate to="campaigns" replace />,
      },
      {
        id: 'SURVEY',
        path: ':campaignId',
        loader: personalizationLoader,
        children: [
          { index: true, element: <Navigate to="audience" replace /> },
          { path: ':step', lazy: lazyLoad('personalization/survey/details') },
        ],
      },
      { path: 'campaigns', lazy: lazyLoad('personalization/survey/campaigns') },
    ],
  },
  {
    path: 'inApp',
    children: [
      {
        index: true,
        element: <Navigate to="campaigns" replace />,
      },
      {
        id: 'inApp',
        path: ':campaignId',
        loader: personalizationLoader,
        children: [
          { index: true, element: <Navigate to="audience" replace /> },
          { path: ':step', lazy: lazyLoad('personalization/inApp/details') },
        ],
      },
      { path: 'campaigns', lazy: lazyLoad('personalization/inApp/campaigns') },
    ],
  },
  {
    path: '*',
    loader: missmatch('personalization/onSite'),
  },
];

export { personalizationChildren };
