import { LoaderFunction, replace } from 'react-router-dom';

import { CONSTANTS } from '@/constants';
import { getCurrentUser } from '@/services/auth/handlers';
import { UserResponseResult } from '@/services/auth/types';
import { useApplicationStore } from '@/store';

import { getCurrentProduct } from './product';

const rootLoader: LoaderFunction = async ({ params }) => {
  const { user, updateUser, clear } = useApplicationStore.getState();
  try {
    let currentUser: UserResponseResult | null = user;

    if (!currentUser) {
      const userAsString = sessionStorage.getItem(CONSTANTS.USER);

      if (!userAsString) currentUser = await getCurrentUser();
      else currentUser = JSON.parse(userAsString) as UserResponseResult;

      updateUser(currentUser);
    }

    if (!currentUser?.login) {
      clear();
      throw replace('/account/login');
    }

    const product = await getCurrentProduct(params, currentUser);

    return { user: currentUser, product };
  } catch (error) {
    clear();
    throw replace('/account/login');
  }
};

export { rootLoader };
