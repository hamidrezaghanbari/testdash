import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../helpers';

const accountChildren: RouteObject[] = [
  { index: true, element: <Navigate to="login" replace /> },
  { path: 'login', lazy: lazyLoad('accounts/login') },
  {
    path: 'register',
    lazy: lazyLoad('accounts/register'),
  },
  { path: 'resetPassword', lazy: lazyLoad('accounts/resetPassword') },
  {
    path: 'passwordVerification',
    lazy: lazyLoad('accounts/passwordVerification'),
  },
  {
    path: '*',
    element: <Navigate to="login" replace />,
  },
];

export { accountChildren };
