import { LoaderFunction, useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';

import { useApplicationStore } from '$/store';

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

const productLoader: LoaderFunction = async ({ params }) => {
  const { success, data } = await productSchema.safeParseAsync(params);

  if (success) {
    const { productId } = data;

    const { product } = useApplicationStore.getState();

    if (product && product.id === productId) return product;

    return await getProduct(productId);
  }

  /**
   * TODO later should return prepared product
   * @returns products[0]
   */
  return await getProduct();
};

const useProductData = () => {
  return useRouteLoaderData<ProductData>('product');
};

export { productLoader, useProductData };
