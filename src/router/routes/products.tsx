import { Navigate, RouteObject } from 'react-router-dom';

import { lazyLoad } from '../helpers';
import { captchaLoader } from '../loaders';

const productsChildren: RouteObject[] = [
  {
    id: 'products-list',
    path: '',
    lazy: lazyLoad('products'),
    loader: captchaLoader,
  },
];

export { productsChildren };
