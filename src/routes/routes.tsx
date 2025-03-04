import { Navigate } from 'react-router-dom';

import { accounts, routes } from './subroutes';
import {
  createRouteObjects,
  createRoutesPermissionMap,
  createSidebarRoutes,
  createfallbacks,
} from './utils';

const routerChildren = createRouteObjects(routes, () => <Navigate to="/" />);

console.log(routerChildren);

const accountChildren = createRouteObjects(accounts, () => <Navigate to="/account" />);

const routerFallbacks = createfallbacks(routes, (to) => <Navigate to={to} />);

const sidebarRoutes = createSidebarRoutes(routes);

const routesPermissionMap = createRoutesPermissionMap(routes);

export { routerChildren, routerFallbacks, accountChildren, routesPermissionMap, sidebarRoutes };
