import { RouteBuilder_experimental } from './builder';

/**
 * @experimental
 */
const builder = new RouteBuilder_experimental();

const rootChildren = builder.defineChildren((route) => ({
  about: route.path('about').title('About').create(),
  contact: route.path('contact').title('Contact').create(),
}));

const accountChildren = builder.defineChildren((route) => ({
  login: route.path('login').title('Login').create(),
  register: route.path('register').title('Register').create(),
}));

const routes = builder.defineRoutes((route) => ({
  root: route.path('/').children(rootChildren).create(),
  account: route.path('/account').fallback('/login').children(accountChildren).create(),
}));

export { routes };
