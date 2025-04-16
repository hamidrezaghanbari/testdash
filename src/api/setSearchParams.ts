import merge from 'lodash-es/merge';
import qs from 'qs';

function setSearchParams<T>(path: T, queries: Record<string, string>): T {
  const init = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const search = qs.stringify(merge(init, queries), { addQueryPrefix: true });

  return (path + search) as T;
}

export { setSearchParams };
