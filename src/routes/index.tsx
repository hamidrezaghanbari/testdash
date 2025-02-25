import { Navigate, createBrowserRouter } from 'react-router-dom';

import { accountChildren, routerChildren, routerFallbacks } from './routes';
import { Account, ErrorBoundary, Root, accountLoader, rootLoader } from './utils';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    Component: Root,
    loader: rootLoader,
    ErrorBoundary,
    HydrateFallback: null,
    hasErrorBoundary: true,
    children: routerChildren,
  },
  {
    path: '/account',
    id: 'account',
    Component: Account,
    loader: accountLoader,
    ErrorBoundary,
    HydrateFallback: null,
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
