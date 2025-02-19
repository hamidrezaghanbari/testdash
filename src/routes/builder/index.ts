import { IconName } from '@smartech/ui';
import { LazyRouteFunction, RouteObject } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

import { groupByEntries } from '$/common';

import { ErrorBoundary } from '../errorBoundary';
import { GetPathParams, TRoute } from './types';

export class Route<
  P extends string,
  N extends string = string,
  PathParams extends Record<string, string> = {},
  QueryParams extends Record<string, string> = {},
  Children extends Record<string, TRoute<string>> = {},
> {
  private pathname!: P;
  private docTitle!: string;
  private group!: string;
  private iconName!: IconName;
  private navigateTo!: N;
  private queries!: QueryParams;
  private childRoutes!: Children;
  private element?: JSX.Element;

  private get params() {
    const hasParams = this.pathname.includes(':');

    return (
      hasParams
        ? Object.fromEntries(this.pathname.match(/:([^/]+)/g)?.map((p) => [p.slice(1), '']) || [])
        : {}
    ) as PathParams;
  }

  path<Path extends string>(pathname: Path): Route<Path, N, GetPathParams<Path>, QueryParams, {}> {
    const instance = new Route<Path, N, GetPathParams<Path>, QueryParams, {}>();
    instance.pathname = pathname;

    instance.docTitle = this.docTitle;
    instance.queries = this.queries;
    instance.navigateTo = this.navigateTo;
    instance.group = this.group;
    instance.iconName = this.iconName;
    instance.element = this.element;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  title(title: string): Route<P, N, PathParams, QueryParams, Children> {
    const instance = new Route<P, N, PathParams, QueryParams, Children>();
    instance.docTitle = title;

    instance.pathname = this.pathname;
    instance.queries = this.queries;
    instance.navigateTo = this.navigateTo;
    instance.group = this.group;
    instance.iconName = this.iconName;
    instance.element = this.element;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  fallback<Fallback extends string>(
    to: Fallback,
  ): Route<P, Fallback, GetPathParams<P>, QueryParams, {}> {
    const instance = new Route<P, Fallback, GetPathParams<P>, QueryParams, {}>();
    instance.navigateTo = [this.pathname, to].join('/').replace(/\/\//g, '/') as Fallback;

    instance.pathname = this.pathname;
    instance.queries = this.queries;
    instance.docTitle = this.docTitle;
    instance.group = this.group;
    instance.iconName = this.iconName;
    instance.element = this.element;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  icon(name: IconName): Route<P, N, PathParams, QueryParams, Children> {
    const instance = new Route<P, N, PathParams, QueryParams, Children>();
    instance.iconName = name;

    instance.pathname = this.pathname;
    instance.queries = this.queries;
    instance.docTitle = this.docTitle;
    instance.navigateTo = this.navigateTo;
    instance.group = this.group;
    instance.element = this.element;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  query<Query extends Record<string, string>>(
    queries: Query,
  ): Route<P, N, PathParams, Query, Children> {
    const instance = new Route<P, N, PathParams, Query, Children>();
    instance.queries = queries;

    instance.pathname = this.pathname;
    instance.iconName = this.iconName;
    instance.docTitle = this.docTitle;
    instance.navigateTo = this.navigateTo;
    instance.group = this.group;
    instance.element = this.element;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  notFound(callback: () => JSX.Element): TRoute<P, N, PathParams, QueryParams, Children> {
    const instance = new Route<P, N, PathParams, QueryParams, Children>();

    instance.element = callback();

    instance.pathname = this.pathname;
    instance.iconName = this.iconName;
    instance.docTitle = this.docTitle;
    instance.navigateTo = this.navigateTo;
    instance.group = this.group;
    instance.queries = this.queries;
    instance.childRoutes = this.childRoutes;

    return instance.create();
  }

  children<C extends Record<string, TRoute<string>>>(
    childBuilder: (r: Route<P, N>) => C,
  ): Route<P, N, PathParams, QueryParams, C> {
    const instance = new Route<P, N, PathParams, QueryParams, C>();

    instance.navigateTo = this.navigateTo;
    instance.pathname = this.pathname;
    instance.docTitle = this.docTitle;
    instance.group = this.group;
    instance.queries = this.queries;
    instance.element = this.element;
    instance.iconName = this.iconName;

    instance.childRoutes = childBuilder(instance);

    return instance;
  }

  groupBy<T extends Record<string, TRoute<P, N, PathParams, QueryParams, Children>>>(
    group: string,
    builder: (route: Route<P, N, PathParams, QueryParams, Children>) => T,
  ): T {
    const routes = builder(this);

    Object.entries(routes).forEach(([key]) => {
      if (routes[key]) routes[key].group = group;
    });

    return routes;
  }

  create(index?: boolean): TRoute<P, N, PathParams, QueryParams, Children> {
    const id = uuidV4();

    const result = { id } as TRoute<P, N, PathParams, QueryParams, Children>;

    if (typeof index !== 'undefined') result['index'] = index;

    result['params'] = this.params;

    if (this.pathname) result['pathname'] = this.pathname;
    if (this.docTitle) result['title'] = this.docTitle;
    if (this.group) result['group'] = this.group;
    if (this.iconName) result['iconName'] = this.iconName;
    if (this.navigateTo) result['navigateTo'] = this.navigateTo;
    if (this.childRoutes) result['children'] = this.childRoutes;
    if (this.queries) result['queries'] = this.queries;
    if (this.element) result['element'] = this.element;

    return result;
  }
}

class RouteBuilder {
  private lazy(name: string): LazyRouteFunction<RouteObject> {
    return async () => {
      const { default: Component } = await import(`$/pages/${name}/index.tsx`);

      return {
        Component,
        ErrorBoundary,
      };
    };
  }

  private concatFilename(parent: string, name: string) {
    const camelCasedName = name.slice(0, 1).toUpperCase() + name.slice(1);

    return parent + camelCasedName;
  }

  defineRoutes<T extends Record<string, TRoute<string>>>(builder: (r: Route<string>) => T): T {
    return builder(new Route());
  }

  defineChildren<T extends Record<string, TRoute<string>>>(builder: (r: Route<string>) => T) {
    return builder;
  }

  sidebarRoutes<T extends Record<string, TRoute<string>>, K extends keyof T>(routes: T, key: K) {
    return groupByEntries<T>(Object.values(routes[key].children), 'group');
  }

  reactRouterChildren<T extends Record<string, TRoute<any>>, K extends keyof T>(routes: T, key: K) {
    const children = (routes[key].children ?? {}) as T[K];

    const toList = (data: T[K], parent: string | null = null): RouteObject[] => {
      const entries = Object.entries(data);

      return entries.map(([name, { index, pathname, children, element }]) => {
        const result: RouteObject = { path: pathname };

        if (index) result['index'] = index;

        if (children) result['children'] = toList(children, name);
        else {
          const missMatched = pathname === '*';

          if (missMatched) result['element'] = element ?? null;
          else {
            const lazyModule = parent ? this.concatFilename(parent, name) : name;
            result['lazy'] = this.lazy(lazyModule);
          }
        }

        return result;
      });
    };

    return toList(children);
  }
}

export { RouteBuilder };
