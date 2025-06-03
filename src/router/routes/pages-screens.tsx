import { RouteObject } from 'react-router-dom';

import { lazyLoad } from '../helpers';

const pagesScreensChildren: RouteObject[] = [
  {
    id: 'pages-screens-list',
    path: '',
    lazy: lazyLoad('pages-screens'),
    // loader: captchaLoader,
  },
];

export { pagesScreensChildren };
