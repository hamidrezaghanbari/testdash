import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '$/hooks';

type RouteMaps = [string, any[]];

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
            const hasAnyPermissions = route.permissions && Array.isArray(route.permissions);

            const hasPermission = hasAnyPermissions
              ? permissions.some((p) => {
                  const ps = route.permissions || [];

                  return ps.includes(p);
                })
              : true;

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
