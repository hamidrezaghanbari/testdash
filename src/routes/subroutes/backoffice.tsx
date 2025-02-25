import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const backofficeChildren: TRoutes[] = [
  {
    path: 'financial',
    title: 'financial',
    icon: 'bank-note-01',
    index: true,
  },
  {
    path: 'role',
    title: 'role',
    icon: 'image-user-check',
  },
  {
    path: 'users',
    title: 'users',
    icon: 'user-square',
  },
  {
    path: 'manageProducts',
    title: 'manage products',
    icon: 'package-check',
  },
  {
    path: 'createProduct',
    title: 'create product',
    icon: 'package-plus',
  },
  {
    path: 'fileStorage',
    title: 'file storage',
    icon: 'server-04',
  },
  {
    path: 'configuration',
    title: 'configuration',
    icon: 'settings-01',
  },
  {
    path: '*',
    element: <Navigate to="/backOffice/financial" />,
  },
];

export { backofficeChildren };
