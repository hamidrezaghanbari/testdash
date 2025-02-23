import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './errorBoundary';
import { Account, Root } from './handlers';
import { accountLoader, rootLoader } from './loaders';
import { authRouterChildren, baseRouterChildren, fallbacks, routes } from './routes';

const router = createBrowserRouter([
  {
    path: routes.root.pathname,
    id: 'root',
    Component: Root,
    loader: rootLoader,
    ErrorBoundary,
    HydrateFallback: null,
    hasErrorBoundary: true,
    children: baseRouterChildren,
  },
  {
    path: routes.account.pathname,
    id: 'account',
    Component: Account,
    loader: accountLoader,
    ErrorBoundary,
    HydrateFallback: null,
    hasErrorBoundary: true,
    children: authRouterChildren,
  },
  {
    path: '*',
    element: <Navigate to={routes.root.pathname} />,
  },
  {
    path: '/account',
    index: true,
    element: <Navigate to={routes.account.children.login.pathname} />,
  },
  ...fallbacks.map(({ path, to }) => ({ path, index: true, element: <Navigate to={to} /> })),
]);

export { router };
