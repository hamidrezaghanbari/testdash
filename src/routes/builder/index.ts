type RouteDefinition<
  P extends string,
  N extends string = string,
  PathParams extends Record<string, string> = {},
  QueryParams extends Record<string, string> = {},
  Children extends Record<string, RouteDefinition<any, any>> = {},
> = {
  pathname: P;
  title: string;
  navigateTo: N;
} & (keyof PathParams extends never ? {} : { params: PathParams }) &
  (keyof QueryParams extends never ? {} : { queries: QueryParams }) &
  (keyof Children extends never ? {} : { children: Children });

type ExtractPathParams<T extends string> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [K in Param]: string } & ExtractPathParams<`/${Rest}`>
  : T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};

class Route<
  P extends string,
  N extends string = string,
  PathParams extends Record<string, string> = {},
  QueryParams extends Record<string, string> = {},
  Children extends Record<string, RouteDefinition<any>> = {},
> {
  private pathname!: P;
  private docTitle!: string;
  private navigateTo!: N;
  private queries!: QueryParams;
  private childRoutes!: Children;

  path<Path extends string>(
    pathname: Path,
  ): Route<Path, N, ExtractPathParams<Path>, QueryParams, {}> {
    const instance = new Route<Path, N, ExtractPathParams<Path>, QueryParams, {}>();
    instance.pathname = pathname;
    instance.docTitle = this.docTitle;
    instance.queries = this.queries;
    instance.navigateTo ??= pathname as unknown as N;
    return instance;
  }

  title(title: string): Route<P, N, PathParams, QueryParams, Children> {
    const instance = new Route<P, N, PathParams, QueryParams, Children>();
    instance.pathname = this.pathname;
    instance.docTitle = title;
    instance.queries = this.queries;
    instance.navigateTo = this.navigateTo;
    instance.childRoutes = this.childRoutes;
    return instance;
  }

  fallback<Fallback extends string>(
    to: Fallback,
  ): Route<P, Fallback, ExtractPathParams<P>, QueryParams, {}> {
    const instance = new Route<P, Fallback, ExtractPathParams<P>, QueryParams, {}>();
    instance.navigateTo = [this.pathname, to].join('/').replace(/\/\//g, '/') as Fallback;
    instance.pathname = this.pathname;
    instance.docTitle = this.docTitle;
    instance.queries = this.queries;
    instance.childRoutes = this.childRoutes;
    return instance;
  }

  query<Query extends Record<string, string>>(
    queries: Query,
  ): Route<P, N, PathParams, Query, Children> {
    const instance = new Route<P, N, PathParams, Query, Children>();
    instance.navigateTo = this.navigateTo;
    instance.pathname = this.pathname;
    instance.docTitle = this.docTitle;
    instance.queries = queries;
    instance.childRoutes = this.childRoutes;
    return instance;
  }

  children<C extends Record<string, RouteDefinition<string>>>(
    childBuilder: (r: Route<P, N>) => C,
  ): Route<P, N, PathParams, QueryParams, C> {
    const instance = new Route<P, N, PathParams, QueryParams, C>();
    instance.navigateTo = this.navigateTo;
    instance.pathname = this.pathname;
    instance.docTitle = this.docTitle;
    instance.queries = this.queries;

    instance.childRoutes = childBuilder(new Route<P, N>().path(`${this.pathname}` as P));

    return instance;
  }

  create(): RouteDefinition<P, N, PathParams, QueryParams, Children> {
    return {
      pathname: this.pathname,
      title: this.docTitle,
      navigateTo: this.navigateTo,
      params: (this.pathname.includes(':')
        ? (Object.fromEntries(
            this.pathname.match(/:([^/]+)/g)?.map((p) => [p.slice(1), '']) || [],
          ) as PathParams)
        : {}) as PathParams,
      queries: (this.queries ?? {}) as QueryParams,
      children: (this.childRoutes ?? {}) as Children,
    };
  }
}

class RouteBuilder_experimental {
  defineRoutes<T extends Record<string, RouteDefinition<string>>>(
    builder: (r: Route<string>) => T,
  ): T {
    return builder(new Route());
  }

  defineChildren<T extends Record<string, RouteDefinition<string>>>(
    builder: (r: Route<string>) => T,
  ) {
    return (r: Route<string>) => this.defineRoutes<T>(() => builder(r));
  }
}

export { RouteBuilder_experimental };
