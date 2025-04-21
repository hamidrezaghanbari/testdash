import { useRouteLoaderData } from 'react-router-dom';

import { DEFAULT_USERS_TAB } from '@/router/loaders';
import { UsersTabData } from '@/router/loaders/_staticTypes';

const useUsersTab = (): UsersTabData => {
  const data = useRouteLoaderData<UsersTabData>('users');

  return data ?? DEFAULT_USERS_TAB;
};

export { useUsersTab };
