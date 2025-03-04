import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Loading } from '$/components/atoms';

import { accountChildren, routerChildren, routerFallbacks } from './routes';
import { Account, ErrorBoundary, Root, accountLoader, rootLoader } from './utils';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    Component: Root,
    loader: rootLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: [
      {
        path: 'personalization',
        children: [
          {
            index: true, // When "/personalization" is accessed
            element: <Navigate to="onSite" replace />, // Redirect to "/personalization/onSite"
          },
          {
            path: 'onSite',
            children: [
              {
                index: true, // When "/personalization/onSite" is accessed
                element: <Navigate to="campaign" replace />, // Redirect to "/personalization/onSite/campaign"
              },
              { path: ':id', element: <h1>onsite params</h1> },
              { path: 'campaign', element: <h1>campaign</h1> },
            ],
          },
        ],
      },
    ],

    // children: routerChildren,
  },
  {
    path: '/account',
    id: 'account',
    Component: Account,
    loader: accountLoader,
    ErrorBoundary,
    HydrateFallback: Loading,
    hasErrorBoundary: true,
    children: accountChildren,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  {
    path: '/account',
    element: <Navigate to="/account/login" />,
    index: true,
  },
  ...routerFallbacks,
]);

export { router };
