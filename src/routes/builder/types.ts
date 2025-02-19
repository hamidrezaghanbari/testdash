import { IconName } from '@smartech/ui';

type TRoute<
  P extends string,
  N extends string = string,
  PathParams extends Record<string, string> = {},
  QueryParams extends Record<string, string> = {},
  Children extends Record<string, TRoute<string>> = {},
> = {
  id: string;
  title: string;
  group: string;
  index?: boolean;
  pathname: P;
  navigateTo: N;
  iconName: IconName;
  children: Children;
  params: PathParams;
  queries: QueryParams;
};

type GetPathParams<T extends string> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [K in Param]: string } & GetPathParams<`/${Rest}`>
  : T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};

export type { TRoute, GetPathParams };
