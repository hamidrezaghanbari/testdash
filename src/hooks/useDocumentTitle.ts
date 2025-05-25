import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// import { sidebarRoutes } from '@/router/routes';
// import { type SidebarRoutes } from '@/router/types';

type RouteMap = [string, any[]];

function grepRoute(routes: RouteMap[], pathname: string): any | undefined {
  for (const [, items] of routes) {
    const found = findRoute(items, pathname);
    if (found) return found;
  }
  return undefined;
}

function findRoute(items: any[], pathname: string): any | undefined {
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

  /**
   * TODO provide sidebar routes
   */
  useEffect(() => {
    const route = grepRoute([], pathname);

    let title = 'Web Analytics';

    if (route?.title) title = route.title + ' | ' + title;

    document.title = title;
  }, [pathname]);
}

export { useDocumentTitle };
