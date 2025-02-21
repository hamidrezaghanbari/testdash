import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './errorBoundary';
import { Root } from './handlers';
import { rootLoader } from './loaders';
import { routerChildren, routerFallbacks, routes } from './routes';

const router = createBrowserRouter([
  {
    path: routes.root.pathname,
    id: 'root',
    Component: Root,
    loader: rootLoader,
    ErrorBoundary,
    HydrateFallback: null,
    hasErrorBoundary: true,
    children: routerChildren,
  },
  {
    path: '*',
    element: <Navigate to={routes.root.pathname} />,
  },
  ...routerFallbacks.map(({ path, to }) => ({
    path,
    index: true,
    element: <Navigate to={to} />,
  })),
]);

export { router };
