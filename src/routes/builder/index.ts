import { IconName } from '@smartech/ui';
import { LazyRouteFunction, RouteObject } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

import { groupByEntries } from '$/common';

import { ErrorBoundary } from '../errorBoundary';
import { GetPathParams, ListOfChildren, ReactRouterFallback, TRoute } from './types';

class Route<
  P extends string,
  PathParams extends Record<string, string> = {},
  QueryParams extends Record<string, string> = {},
  Children extends Record<string, TRoute<string>> = {},
> {
  private pathname!: P;
  private docTitle!: string;
  private group!: string;
  private iconName!: IconName;
  private queries!: QueryParams;
  private childRoutes!: Children;
  private element: JSX.Element | null = null;

  private get params() {
    const hasParams = this.pathname.includes(':');

    return (
      hasParams
        ? Object.fromEntries(this.pathname.match(/:([^/]+)/g)?.map((p) => [p.slice(1), '']) || [])
        : {}
    ) as PathParams;
  }

  private normalize(path: string) {
    return ['/', path.replace(/\//g, '')].join('');
  }

  path<Path extends string>(pathname: Path): Route<Path, GetPathParams<Path>, QueryParams, {}> {
    const instance = new Route<Path, GetPathParams<Path>, QueryParams, {}>();
    instance.pathname = pathname;

    instance.docTitle = this.docTitle;
    instance.queries = this.queries;
    instance.group = this.group;
    instance.iconName = this.iconName;
    instance.element = this.element;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  title(title: string): Route<P, PathParams, QueryParams, Children> {
    const instance = new Route<P, PathParams, QueryParams, Children>();
    instance.docTitle = title;

    instance.pathname = this.pathname;
    instance.queries = this.queries;
    instance.group = this.group;
    instance.iconName = this.iconName;
    instance.element = this.element;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  icon(name: IconName): Route<P, PathParams, QueryParams, Children> {
    const instance = new Route<P, PathParams, QueryParams, Children>();
    instance.iconName = name;

    instance.pathname = this.pathname;
    instance.queries = this.queries;
    instance.docTitle = this.docTitle;
    instance.group = this.group;
    instance.element = this.element;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  query<Query extends Record<string, string>>(
    queries: Query,
  ): Route<P, PathParams, Query, Children> {
    const instance = new Route<P, PathParams, Query, Children>();
    instance.queries = queries;

    instance.pathname = this.pathname;
    instance.iconName = this.iconName;
    instance.docTitle = this.docTitle;
    instance.group = this.group;
    instance.element = this.element;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  notFound(callback: (parent: string) => JSX.Element): Route<P, PathParams, QueryParams, Children> {
    const instance = new Route<P, PathParams, QueryParams, Children>();
    instance.pathname = '*' as P;
    instance.iconName = this.iconName;
    instance.docTitle = this.docTitle;
    instance.group = this.group;
    instance.queries = this.queries;
    instance.childRoutes = this.childRoutes;

    instance.element = callback(this.normalize(this.pathname));

    return instance;
  }

  children<C extends Record<string, TRoute<string>>>(
    childBuilder: (r: Route<P>) => C,
  ): Route<P, PathParams, QueryParams, C> {
    const instance = new Route<P, PathParams, QueryParams, C>();

    instance.pathname = this.pathname;
    instance.docTitle = this.docTitle;
    instance.group = this.group;
    instance.queries = this.queries;
    instance.iconName = this.iconName;
    instance.element = this.element;

    instance.childRoutes = childBuilder(instance);

    return instance;
  }

  groupBy<T extends Record<string, TRoute<string>>>(
    group: string,
    builder: (route: Route<P, PathParams, QueryParams, Children>) => T,
  ): T {
    const routes = builder(this);

    Object.entries(routes).forEach(([key]) => {
      routes[key].group = group;
    });

    return routes;
  }

  create(index?: boolean): TRoute<P, PathParams, QueryParams, Children> {
    const id = uuidV4();

    const result = { id } as TRoute<P, PathParams, QueryParams, Children>;

    if (typeof index !== 'undefined') result['index'] = index;

    result['params'] = this.params;

    if (this.pathname) result['pathname'] = this.pathname;
    if (this.docTitle) result['title'] = this.docTitle;
    if (this.group) result['group'] = this.group;
    if (this.iconName) result['iconName'] = this.iconName;
    if (this.childRoutes) result['children'] = this.childRoutes;
    if (this.queries) result['queries'] = this.queries;
    if (this.element) result['element'] = this.element;

    return result;
  }
}

class RouteBuilder {
  private lazy(
    name: string,
    mod: string,
    fallback: () => JSX.Element,
  ): LazyRouteFunction<RouteObject> {
    return async () => {
      try {
        const { default: Component } = await import(`$/pages/${name}/index.tsx`);

        return {
          Component,
          ErrorBoundary,
          hasErrorBoundary: true,
        };
      } catch (error) {
        console.error('cannot load %s module, redirect to dashboard automatically', mod);

        return {
          element: fallback(),
        };
      }
    };
  }

  private concatFilename(parent: string, name: string) {
    const camelCasedName = name.slice(0, 1).toUpperCase() + name.slice(1);

    return parent + camelCasedName;
  }

  private matchedTo(path: string, leading?: string) {
    return `/${path}/${leading || '*'}`;
  }

  private filterMissMatchers<T extends Record<string, TRoute<string>>, K extends keyof T>(
    items: ListOfChildren<T[K]>[],
  ) {
    return items
      .filter((item) => item.pathname !== '*')
      .map((item) => {
        const result = { ...item };

        if ('children' in item && item['children']) {
          result.children = this.filterMissMatchers(
            Object.values(item.children) as ListOfChildren<T[K]>[],
          );
        }

        return result;
      });
  }

  private createHref<T extends Record<string, TRoute<string>>, K extends keyof T>(
    items: Array<T[K]>,
    parent: string | null = null,
  ): Array<ListOfChildren<T[K]>> {
    return items.map((item) => {
      const href = parent ? [parent, item.pathname].join('/') : item.pathname;

      const result = {
        ...item,
        href: `/${href}`.replace(/\/\//g, '/'),
      } as ListOfChildren<T[K]>;

      if ('children' in item && item['children']) {
        result.children = this.createHref(Object.values(item.children) as Array<T[K]>, href);
      }

      return result;
    });
  }

  defineRoutes<T extends Record<string, TRoute<string>>>(builder: (r: Route<string>) => T): T {
    return builder(new Route());
  }

  defineChildren<T extends Record<string, TRoute<string>>>(builder: (r: Route<string>) => T) {
    return builder;
  }

  sidebarRoutes<T extends Record<string, TRoute<string>>, K extends keyof T>(routes: T, key: K) {
    const items: Array<T[K]> = Object.values(routes[key].children);

    const itemsWithHref = this.createHref(items);

    return groupByEntries<ListOfChildren<T[K]>>(this.filterMissMatchers(itemsWithHref), 'group');
  }

  reactRouterFallbacks<T extends Record<string, TRoute<any>>, K extends keyof T & string>(
    routes: T,
    key: K,
  ) {
    const result: ReactRouterFallback[] = [];

    const children = (routes[key].children ?? {}) as T;

    for (const key in children) {
      if (children[key].children) {
        const path = children[key]['pathname'];
        const indexed = Object.values((children[key]['children'] ?? {}) as T[K]).find(
          (item) => item.index,
        );

        result.push({ path, to: this.matchedTo(path, indexed?.pathname) });
      }
    }

    return result;
  }

  reactRouterChildren<T extends Record<string, TRoute<any>>, K extends keyof T>(
    routes: T,
    key: K,
    fallback: () => JSX.Element,
  ) {
    const children = (routes[key].children ?? {}) as T;

    const toList = (data: T, parent: string | null = null): RouteObject[] => {
      const entries = Object.entries(data);

      return entries.map(([name, { index, pathname, children, element }]) => {
        const result: RouteObject = { path: pathname };

        if (index) (result as RouteObject)['index'] = index;

        if (children) result['children'] = toList(children as T, name);
        else {
          switch (pathname) {
            case '*':
              result['element'] = element;
              break;
            default: {
              const lazyModule = parent ? this.concatFilename(parent, name) : name;
              result['lazy'] = this.lazy(lazyModule, name, fallback);
            }
          }
        }

        return result;
      });
    };

    return toList(children);
  }
}

export { RouteBuilder };
