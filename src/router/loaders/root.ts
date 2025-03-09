import { LoaderFunction, replace } from 'react-router-dom';

import { tryGetProduct } from './product';
import { tryGetUser } from './user';

const rootLoader: LoaderFunction = async ({ params }) => {
  try {
    const user = await tryGetUser();

    if (!user) return replace('/account/login');

    const product = await tryGetProduct(params);

    return { user, product };
  } catch (error) {
    throw replace('/account/login');
  }
};

export { rootLoader };
