import { Navigate } from 'react-router-dom';

import { accounts, routes } from './subroutes';
import { createRouteObjects, createSidebarRoutes, createfallbacks } from './utils';

const routerChildren = createRouteObjects(routes, () => <Navigate to="/" />);

const accountChildren = createRouteObjects(accounts, () => <Navigate to="/account" />);

const routerFallbacks = createfallbacks(routes, (to) => <Navigate to={to} />);

const sidebarRoutes = createSidebarRoutes(routes);

export { routerChildren, routerFallbacks, accountChildren, sidebarRoutes };
