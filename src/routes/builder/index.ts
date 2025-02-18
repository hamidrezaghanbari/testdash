import { IconName } from '@smartech/ui';
import { v4 as uuidV4 } from 'uuid';

import { ExtractPathParams, RouteDefinition } from './types';

export class Route<
  P extends string,
  N extends string = string,
  PathParams extends Record<string, string> = {},
  QueryParams extends Record<string, string> = {},
  Children extends Record<string, RouteDefinition<string>> = {},
> {
  private id!: string;
  private pathname!: P;
  private docTitle!: string;
  private group!: string;
  private iconName!: IconName;
  private navigateTo!: N;
  private queries!: QueryParams;
  private childRoutes!: Children;

  private getParams() {
    const hasParams = this.pathname.includes(':');

    return (
      hasParams
        ? Object.fromEntries(this.pathname.match(/:([^/]+)/g)?.map((p) => [p.slice(1), '']) || [])
        : {}
    ) as PathParams;
  }

  path<Path extends string>(
    pathname: Path,
  ): Route<Path, N, ExtractPathParams<Path>, QueryParams, {}> {
    const instance = new Route<Path, N, ExtractPathParams<Path>, QueryParams, {}>();
    instance.id = uuidV4();

    instance.pathname = pathname;

    instance.docTitle = this.docTitle;
    instance.queries = this.queries;
    instance.navigateTo = this.navigateTo;
    instance.group = this.group;
    instance.iconName = this.iconName;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  title(title: string): Route<P, N, PathParams, QueryParams, Children> {
    const instance = new Route<P, N, PathParams, QueryParams, Children>();
    instance.docTitle = title;

    instance.id = this.id;
    instance.pathname = this.pathname;
    instance.queries = this.queries;
    instance.navigateTo = this.navigateTo;
    instance.group = this.group;
    instance.iconName = this.iconName;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  fallback<Fallback extends string>(
    to: Fallback,
  ): Route<P, Fallback, ExtractPathParams<P>, QueryParams, {}> {
    const instance = new Route<P, Fallback, ExtractPathParams<P>, QueryParams, {}>();
    instance.navigateTo = [this.pathname, to].join('/').replace(/\/\//g, '/') as Fallback;

    instance.id = this.id;
    instance.pathname = this.pathname;
    instance.queries = this.queries;
    instance.docTitle = this.docTitle;
    instance.group = this.group;
    instance.iconName = this.iconName;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  icon(name: IconName): Route<P, N, PathParams, QueryParams, Children> {
    const instance = new Route<P, N, PathParams, QueryParams, Children>();
    instance.iconName = name;

    instance.id = this.id;
    instance.pathname = this.pathname;
    instance.queries = this.queries;
    instance.docTitle = this.docTitle;
    instance.navigateTo = this.navigateTo;
    instance.group = this.group;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  query<Query extends Record<string, string>>(
    queries: Query,
  ): Route<P, N, PathParams, Query, Children> {
    const instance = new Route<P, N, PathParams, Query, Children>();
    instance.queries = queries;

    instance.id = this.id;
    instance.pathname = this.pathname;
    instance.iconName = this.iconName;
    instance.docTitle = this.docTitle;
    instance.navigateTo = this.navigateTo;
    instance.group = this.group;
    instance.childRoutes = this.childRoutes;

    return instance;
  }

  children<C extends Record<string, RouteDefinition<string>>>(
    childBuilder: (r: Route<P, N>) => C,
  ): Route<P, N, PathParams, QueryParams, C> {
    const instance = new Route<P, N, PathParams, QueryParams, C>();

    instance.id = this.id;
    instance.navigateTo = this.navigateTo;
    instance.pathname = this.pathname;
    instance.docTitle = this.docTitle;
    instance.group = this.group;
    instance.queries = this.queries;
    instance.iconName = this.iconName;

    instance.childRoutes = childBuilder(instance);

    return instance;
  }

  groupBy<T extends Record<string, RouteDefinition<P, N, PathParams, QueryParams, Children>>>(
    group: string,
    builder: (route: Route<P, N, PathParams, QueryParams, Children>) => T,
  ): T {
    const routes = builder(this);

    Object.entries(routes).forEach(([key]) => {
      if (routes[key]) routes[key].group = group;
    });

    return routes;
  }

  create(): RouteDefinition<P, N, PathParams, QueryParams, Children> {
    return {
      id: this.id,
      pathname: this.pathname,
      title: this.docTitle,
      group: this.group,
      navigateTo: this.navigateTo,
      iconName: this.iconName,
      params: this.getParams(),
      queries: this.queries,
      children: this.childRoutes,
    };
  }
}

class RouteBuilder {
  defineRoutes<T extends Record<string, RouteDefinition<string>>>(
    builder: (r: Route<string>) => T,
  ): T {
    return builder(new Route());
  }

  defineChildren<T extends Record<string, RouteDefinition<string>>>(
    builder: (r: Route<string>) => T,
  ) {
    return builder;
  }
}

export { RouteBuilder };
