import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../helpers';

const backOfficeChildren: RouteObject[] = [
  { index: true, element: <Navigate to="financial" replace /> },
  {
    path: 'financial',
    lazy: lazyLoad('backOffice/financial'),
  },
  { path: 'role', lazy: lazyLoad('backOffice/role') },
  { path: 'users', lazy: lazyLoad('backOffice/users') },
  {
    path: 'manageProducts',
    lazy: lazyLoad('backOffice/manageProducts'),
  },
  {
    path: 'createProduct',
    lazy: lazyLoad('backOffice/createProduct'),
  },
  {
    path: 'contracts',
    lazy: lazyLoad('backOffice/contracts'),
  },
  {
    path: 'fileStorage',
    lazy: lazyLoad('backOffice/fileStorage'),
  },
  {
    path: 'configuration',
    lazy: lazyLoad('backOffice/configuration'),
  },
  {
    path: '*',
    element: <Navigate to="financial" />,
  },
];

export { backOfficeChildren };
