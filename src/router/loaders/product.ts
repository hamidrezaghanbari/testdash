import { z } from 'zod';

import { useApplicationStore } from '@/store';

type ProductData = {
  id: string;
};

const productSchema = z.object({
  productId: z.string().nonempty(),
});

async function getProduct(productId?: string) {
  const products = await Promise.resolve<ProductData[]>([{ id: '1' }, { id: '2' }]);

  const product = products.find(({ id }) => id === productId) ?? products[0];

  useApplicationStore.setState((state) => ({ ...state, product }));

  return product;
}

export { productSchema, getProduct };
