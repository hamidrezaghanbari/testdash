import { LoaderFunction, replace } from 'react-router-dom';

import { CONSTANTS } from '@/constants';
import { currentUser } from '@/services/auth';
import { UserResponseResult } from '@/services/auth/user/user.schema';
import { useApplicationStore } from '@/store';

import { getCurrentProduct } from './product';

const rootLoader: LoaderFunction = async ({ params }) => {
  try {
    let user = useApplicationStore.getState().user;

    if (!user) {
      const userAsString = sessionStorage.getItem(CONSTANTS.USER);

      if (!userAsString) user = await currentUser();
      else user = JSON.parse(userAsString) as UserResponseResult;

      useApplicationStore.setState((state) => ({ ...state, user }));
    }

    if (!user?.login) {
      useApplicationStore.getState().clear();
      throw replace('/account/login');
    }

    const product = await getCurrentProduct(params, user);

    return { user, product };
  } catch (error) {
    useApplicationStore.getState().clear();
    throw replace('/account/login');
  }
};

export { rootLoader };
