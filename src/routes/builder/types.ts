import { IconName } from '@smartech/ui';

type TRoute<
  P extends string,
  PathParams extends Record<string, string> = {},
  QueryParams extends Record<string, string> = {},
  Children extends Record<string, TRoute<string>> = {},
> = {
  id: string;
  title: string;
  group: string;
  href: string;
  index?: boolean;
  pathname: P;
  iconName: IconName;
  children: Children;
  params: PathParams;
  queries: QueryParams;
  element?: JSX.Element;
};

type GetPathParams<T extends string> = T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [K in Param]: string } & GetPathParams<`/${Rest}`>
  : T extends `${infer _Start}:${infer Param}`
    ? { [K in Param]: string }
    : {};

type ReactRouterFallback = {
  path: string;
  to: string;
};

type ListOfChildren<T> = {
  [K in keyof T]: K extends 'children' ? ListOfChildren<T[K]>[] : T[K];
};

export type { TRoute, GetPathParams, ReactRouterFallback, ListOfChildren };
