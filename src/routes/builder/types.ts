import { IconName } from '@smartech/ui';

type RouteDefinition<
  P extends string,
  N extends string = string,
  PathParams extends Record<string, string> = {},
  QueryParams extends Record<string, string> = {},
  Children extends Record<string, RouteDefinition<string>> = {},
> = {
  id: string;
  title: string;
  group: string;
  pathname: P;
  navigateTo: N;
  iconName: IconName;
  children: Children;
  params: PathParams;
  queries: QueryParams;
};

type ExtractPathParams<T extends string> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [K in Param]: string } & ExtractPathParams<`/${Rest}`>
  : T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};

export type { RouteDefinition, ExtractPathParams };
