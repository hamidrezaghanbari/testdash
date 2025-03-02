import { Navigate } from 'react-router-dom';

import { TRoutes } from '../types';

const backofficeChildren: TRoutes[] = [
  {
    path: 'financial',
    title: 'financial',
    icon: 'bank-note-01',
    index: true,
    permissions: [],
  },
  {
    path: 'role',
    title: 'role',
    icon: 'image-user-check',
    permissions: [],
  },
  {
    path: 'users',
    title: 'users',
    icon: 'user-square',
    permissions: [],
  },
  {
    path: 'manageProducts',
    title: 'manage products',
    icon: 'package-check',
    permissions: [],
  },
  {
    path: 'createProduct',
    title: 'create product',
    icon: 'package-plus',
    permissions: [],
  },
  {
    path: 'fileStorage',
    title: 'file storage',
    icon: 'server-04',
    permissions: [],
  },
  {
    path: 'configuration',
    title: 'configuration',
    icon: 'settings-01',
    permissions: [],
  },
  {
    path: '*',
    element: <Navigate to="/backOffice/financial" />,
  },
];

export { backofficeChildren };
