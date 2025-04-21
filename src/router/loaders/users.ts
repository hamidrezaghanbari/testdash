import qs from 'qs';
import { LoaderFunction, replace } from 'react-router-dom';
import { z } from 'zod';

import { UsersTabData } from './_staticTypes';

const usersSchema = z.object({
  tab: z.string().refine((value) => ['overview', 'analyze', 'search'].includes(value)),
});

const DEFAULT_USERS_TAB: UsersTabData = { tab: 'overview' };

const usersLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const queries = qs.parse(url.search, { ignoreQueryPrefix: true });

  const { data, success } = await usersSchema.safeParseAsync(queries);

  if (success) return data;

  const search = qs.stringify(DEFAULT_USERS_TAB, { addQueryPrefix: true });

  const target = url.origin + url.pathname + search;

  return replace(target);
};

export { usersLoader, DEFAULT_USERS_TAB };
