import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './errorBoundary';
import { Root } from './handlers';
import { rootLoader } from './loaders';
import { routerChildren, routes } from './routes';

console.log(routerChildren);

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
]);

export { router };
