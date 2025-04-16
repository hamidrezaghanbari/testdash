import { redirect, useRouteLoaderData } from 'react-router-dom';

import { CONSTANTS } from '@/constants';
import { UserResponseResult } from '@/services/auth/user/user.schema';
import { ApplicationState } from '@/store';

/**
 * only works in react router children
 */
const useCurrentUser = () => {
  let user: UserResponseResult | null = null;

  const data = useRouteLoaderData<ApplicationState>('root');

  if (data) user = data.user;

  if (!user) {
    const userAsString = sessionStorage.getItem(CONSTANTS.USER);

    if (!userAsString) throw redirect('/account/login');

    user = JSON.parse(userAsString) as UserResponseResult;
  }

  if (!user) throw redirect('/account/login');

  return user;
};

export { useCurrentUser };
