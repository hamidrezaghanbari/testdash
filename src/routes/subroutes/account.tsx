import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const accounts: TRoutes[] = [
  {
    path: 'login',
  },
  {
    path: 'register',
  },
  {
    path: '*',
    element: <Navigate to="/account/login" />,
  },
];

export { accounts };
