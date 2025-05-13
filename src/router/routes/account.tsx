import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../helpers';
import { captchaLoader } from '../loaders';

const accountChildren: RouteObject[] = [
  { index: true, element: <Navigate to="login" replace /> },
  {
    id: 'login',
    path: 'login',
    lazy: lazyLoad('accounts/login'),
    loader: captchaLoader,
  },
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
