import { RouteBuilder } from './builder';

const builder = new RouteBuilder();

// root children
const rootChildren = builder.defineChildren((route) => ({
  about: route.path('about').title('About').create(),
  contact: route.path('contact').title('Contact').create(),
}));

// account children
const accountChildren = builder.defineChildren((route) => ({
  login: route.path('login').title('Login').create(),
  register: route.path('register').title('Register').create(),
}));

const routes = builder.defineRoutes((route) => ({
  root: route.path('/product/:id').children(rootChildren).create(),
  account: route.path('/account').fallback('/login').children(accountChildren).create(),
}));

export { routes };
