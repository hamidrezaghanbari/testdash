import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../helpers';

const backOfficeChildren: RouteObject[] = [
  { index: true, element: <Navigate to="financial" replace /> },
  {
    path: 'financial',
    children: [
      {
        index: true,
        lazy: lazyLoad('backOffice/financial'),
      },
      {
        
        index: true,
        path: 'invoice-list/:id',
        lazy: lazyLoad('backOffice/financial/invoice-list'),
      },
      {
        path: 'invoice-list/:id/invoice-preview/:recordId',
        lazy: lazyLoad('backOffice/financial/invoice-list-preview'),
      },
    ],
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
