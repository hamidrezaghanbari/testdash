import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { sidebarRoutes } from '$/routes/routes';
import { type SidebarRoutes } from '$/routes/types';

type RouteMap = [string, SidebarRoutes[]];

function grepRoute(routes: RouteMap[], pathname: string): SidebarRoutes | undefined {
  for (const [, items] of routes) {
    const found = findRoute(items, pathname);
    if (found) return found;
  }
  return undefined;
}

function findRoute(items: SidebarRoutes[], pathname: string): SidebarRoutes | undefined {
  for (const item of items) {
    if (item.href === pathname) {
      return item;
    }
    if (item.children) {
      const found = findRoute(item.children, pathname);
      if (found) return found;
    }
  }
  return undefined;
}

function useDocumentTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = grepRoute(sidebarRoutes, pathname);

    let title = 'Intrack';

    if (route?.title) title = route.title + ' | ' + title;

    document.title = title;
  }, [pathname]);
}

export { useDocumentTitle };
