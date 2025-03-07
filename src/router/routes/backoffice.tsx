import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../helpers';
import { missmatch } from '../loaders';

const backOfficeChildren: RouteObject[] = [
  { index: true, element: <Navigate to="financial" replace /> },
  {
    path: 'financial',
    lazy: lazyLoad('settings/financial'),
  },
  { path: 'role', lazy: lazyLoad('settings/role') },
  { path: 'users', lazy: lazyLoad('settings/users') },
  {
    path: 'manageProducts',
    lazy: lazyLoad('settings/manageProducts'),
  },
  {
    path: 'create products',
    lazy: lazyLoad('settings/createProduct'),
  },
  {
    path: 'contracts',
    lazy: lazyLoad('settings/contracts'),
  },
  {
    path: 'fileStorage',
    lazy: lazyLoad('settings/fileStorage'),
  },
  {
    path: 'configuration',
    lazy: lazyLoad('settings/configuration'),
  },
  {
    path: '*',
    loader: missmatch('backOffice/financial'),
  },
];

export { backOfficeChildren };
