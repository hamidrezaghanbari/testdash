import { LoaderFunction, replace } from 'react-router-dom';
import { z } from 'zod';

import { useApplicationStore } from '@/store';

const productSchema = z.object({
  productId: z.string().nonempty(),
});

type ProductData = {
  id: string;
};

async function getProduct(productId?: string) {
  const products = await Promise.resolve<ProductData[]>([{ id: '1' }, { id: '2' }]);

  const product = products.find(({ id }) => id === productId) ?? products[0];

  useApplicationStore.setState((state) => ({ ...state, product }));

  return product;
}

const rootLoader: LoaderFunction = async ({ params }) => {
  try {
    const user = await Promise.resolve({ login: true });

    if (!user || !user.login) return replace('/account/login');

    const { success, data } = await productSchema.safeParseAsync(params);

    if (success) {
      const { productId } = data;

      const store = useApplicationStore.getState();

      if (store.product && store.product.id === productId) return store.product;

      const product = await getProduct(productId);

      return { user, product };
    }

    const product = await getProduct();

    /**
     * TODO later should return prepared product
     * @returns products[0]
     */
    return { user, product };

    // return user;
  } catch (error) {
    throw replace('/account/login');
  }
};

export { rootLoader };
