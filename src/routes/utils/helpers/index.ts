import { LazyRouteFunction, RouteObject } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

import { groupByEntries } from '$/common';
import { SidebarRoutes, TRoutes } from '$/routes/types';

import { ErrorBoundary } from '../errorBoundary';

function createRouteObjects(
  routes: TRoutes[],
  cb: () => JSX.Element,
  parent: string | null = null,
): RouteObject[] {
  return routes.map(({ path, children, element, index }) => {
    const result: RouteObject = { path };

    if (!path) throw new Error(`[createRouteObjects] path is required.`);

    if (index) (result as RouteObject)['index'] = index;

    if (children && children.length > 0) {
      result['children'] = createRouteObjects(children, cb, path);
    } else {
      switch (path) {
        case '*':
          if (element) result['element'] = element;
          break;
        default: {
          const lazyModule = parent ? concatNames(parent, path) : path;
          result['lazy'] = lazy(lazyModule, path, cb);
        }
      }
    }

    return result;
  });
}

function matchedTo(path: string, leading?: string) {
  return `/${path}/${leading || '*'}`;
}

function createfallbacks(routes: TRoutes[], element: (to: string) => JSX.Element): RouteObject[] {
  return routes.map(({ path, children = [] }) => {
    const exact = children.find((item) => item.index);

    if (!path) throw new Error(`[createfallbacks] path is required.`);

    return {
      path,
      element: element(matchedTo(path, exact?.path)),
    };
  });
}

function injectId(routes: TRoutes[]): TRoutes[] {
  return routes.map(({ children, ...rest }) => ({
    ...rest,
    id: uuidV4(),
    children: injectId(children || []),
  }));
}

function createSidebarRoutes(routes: TRoutes[]): [string, SidebarRoutes[]][] {
  const items = createHref(injectId(routes));

  return groupByEntries(filterMissMatchers(items), 'group');
}

function filterMissMatchers(items: TRoutes[] = []): SidebarRoutes[] {
  return items
    .filter(({ path }) => path !== '*')
    .map((item) => {
      const children = filterMissMatchers(item.children);

      const result = { ...item, children } as SidebarRoutes;

      return result;
    });
}

function createHref(routes: TRoutes[], parent: string | null = null) {
  return routes.map((route) => {
    if (!route.path) throw new Error(`[createHref] path is required.`);

    let href = parent ? [parent, route.path].join('/') : route.path;

    if (!href.startsWith('/')) href = '/' + href;

    const result = { ...route, href };

    if (route.children) {
      result.children = createHref(route.children, href);
    }

    return result;
  });
}

function concatNames(parent: string, name: string) {
  const camelCasedName = name.slice(0, 1).toUpperCase() + name.slice(1);

  return parent + camelCasedName;
}

function lazy(
  module: string,
  name: string,
  element: () => JSX.Element,
): LazyRouteFunction<RouteObject> {
  return async () => {
    try {
      if (module === '/') module = 'dashboard';

      const { default: Component } = await import(`$/pages/${module}/index.tsx`);

      return { Component, ErrorBoundary, hasErrorBoundary: true };
    } catch (error) {
      console.error('Cannot load %s module, redirect to dashboard automatically', name);

      return { element: element() };
    }
  };
}

export {
  lazy,
  concatNames,
  createRouteObjects,
  createfallbacks,
  createSidebarRoutes,
  createHref,
  filterMissMatchers,
};
