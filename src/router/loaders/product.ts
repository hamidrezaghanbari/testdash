import { Params } from 'react-router-dom';
import { z } from 'zod';

import { useApplicationStore } from '@/store';

type ProductData = {
  id: string;
};

const productSchema = z.object({
  productId: z.string().nonempty(),
});

async function getAndSaveProduct(productId?: string) {
  const products = await Promise.resolve<ProductData[]>([{ id: '1' }, { id: '2' }]);

  const product = products.find(({ id }) => id === productId) ?? products[0];

  useApplicationStore.setState((state) => ({ ...state, product }));

  return product;
}

async function tryGetProduct(params: Params<string>) {
  const { success, data } = await productSchema.safeParseAsync(params);

  const { product } = useApplicationStore.getState();

  if (success) {
    const { productId } = data;

    if (product && product.id === productId) return product;

    return await getAndSaveProduct(productId);
  }

  if (product) return product;

  /**
   * TODO later should return prepared product
   */
  return await getAndSaveProduct();
}

export { productSchema, tryGetProduct };
