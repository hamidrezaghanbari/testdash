import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '$/hooks';
import { PERMISSIONS } from '$/routes/permissions';
import { SidebarRoutes } from '$/routes/types';

type RouteMaps = [string, SidebarRoutes[]];

function filterRoutes(routes: RouteMaps[], permissions: string[]): RouteMaps[] {
  const cache = new Map<string, boolean>();

  return routes
    .map(([key, items]) => {
      const filteredRoutes = items
        .map((route) => {
          const filteredChildren = route.children
            ? filterRoutes([['', route.children]], permissions)
            : [];

          return {
            ...route,
            children: filteredChildren.length > 0 ? filteredChildren[0][1] : [],
          };
        })
        .filter((route) => {
          if (!cache.has(route.href)) {
            const routePermission = PERMISSIONS.get(route.href);
            const hasPermission = routePermission
              ? permissions.some((p) => routePermission.includes(p))
              : false;

            cache.set(route.href, hasPermission);
          }

          return cache.get(route.href) || route.children.length > 0;
        });

      return [key, filteredRoutes] as RouteMaps;
    })
    .filter(([, routes]) => routes.length > 0);
}

function useSidebarFilteredRoutes(items: RouteMaps[]) {
  const user = useCurrentUser();

  const navigate = useNavigate();

  if (!user) {
    navigate('/account/login');

    return [];
  }

  return filterRoutes(items, user.permissions || []);
}

export { useSidebarFilteredRoutes };
