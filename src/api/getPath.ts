type FetcherPath<T extends string> = T extends `${string}/:${infer Param}/${infer Rest}`
  ? { [K in Param]: string } | FetcherPath<`/${Rest}`>
  : T extends `${string}/:${infer Param}`
    ? { [K in Param]: string }
    : {};

function getPath<T extends string>(path: T, params: FetcherPath<T>) {
  return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    const value = (params as Record<string, string>)[key];
    if (!value) throw new Error(`Missing value for parameter '${key}'`);
    return value;
  }) as T;
}

export { getPath };
export type { FetcherPath };
