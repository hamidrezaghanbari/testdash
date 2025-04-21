import { startTransition } from 'react';
import { generatePath, useMatch, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { useApplicationStore } from '@/store';

import { useCurrentUser } from './useCurrentUser';

const restSchema = z.object({
  ['*']: z.string().optional().default(''),
});

const useSetProductParams = () => {
  const match = useMatch('/product/:productId/*');

  const navigate = useNavigate();

  const params = useParams();

  const { updateProduct, product } = useApplicationStore();

  const { products } = useCurrentUser();

  const setProduct = (productId: number) => {
    if (!match || typeof productId === 'undefined') return;

    const { success, data } = restSchema.safeParse(match.params);

    if (!success) return;

    const pattern = match.pattern.path.replace('*', data['*']);

    const currentProduct = products.find((product) => product.id === productId);

    if (currentProduct) updateProduct(currentProduct);

    startTransition(() => {
      navigate(generatePath(pattern, { productId }));
    });
  };

  const selectedProductId = params.productId ? parseInt(params.productId) : (product?.id ?? -1);

  return { selectedProductId, setProduct };
};

export { useSetProductParams };
