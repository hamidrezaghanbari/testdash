import { Navigate, createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './errorBoundary';
import { Account, Root } from './handlers';
import { accountLoader, lazyLoad, rootLoader } from './loaders';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    Component: Root,
    loader: rootLoader,
    ErrorBoundary,
    hasErrorBoundary: true,
    children: [
      {
        index: true,
        path: '/',
        lazy: lazyLoad('dashboard'),
      },
      {
        path: 'about',
        lazy: lazyLoad('about'),
      },
      {
        path: 'contact',
        lazy: lazyLoad('contact'),
      },
    ],
  },
  {
    path: '/account',
    Component: Account,
    ErrorBoundary,
    loader: accountLoader,
    children: [
      {
        index: true,
        path: '/account',
        element: <Navigate to="login" />,
      },
      {
        path: 'login',
        lazy: lazyLoad('login'),
      },
      {
        path: 'register',
        lazy: lazyLoad('register'),
      },
      {
        path: '*',
        element: <Navigate to="login" />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export { router };
