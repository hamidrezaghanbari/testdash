import { LoaderFunction, replace } from 'react-router-dom';

import { useApplicationStore } from '@/store';

import { getProduct, productSchema } from './product';

const rootLoader: LoaderFunction = async ({ params }) => {
  try {
    const user = await Promise.resolve({ login: true });

    if (!user || !user.login) return replace('/account/login');

    const { success, data } = await productSchema.safeParseAsync(params);

    if (success) {
      const { productId } = data;

      const { product: p } = useApplicationStore.getState();

      if (p && p.id === productId) return p;

      const product = await getProduct(productId);

      return { user, product };
    }

    /**
     * TODO later should return prepared product
     * @returns products[0]
     */
    const product = await getProduct();

    return { user, product };

    // return user;
  } catch (error) {
    throw replace('/account/login');
  }
};

export { rootLoader };
