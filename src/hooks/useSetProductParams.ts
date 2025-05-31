import { startTransition } from 'react';
import { generatePath, useMatch, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

import { fetcher } from '@/api/fetcher';
import { getPath } from '@/api/getPath';
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

  const setProduct = async (productId: number) => {
    if (typeof productId === 'undefined') return;

    const currentProduct = products.find((product) => product.id === productId);

    if (currentProduct) {
      updateProduct(currentProduct);

      try {
        await fetcher(getPath('/auth/profile/updateLastProductSubmit', { id: String(productId) }), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'product-id': String(productId),
          },
          body: JSON.stringify({ lastProduct: productId }),
        });

        await fetcher('/auth/authentication/currentUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Failed to update last product:', error);
      }
    }

    startTransition(() => {
      if (match) {
        const { success, data } = restSchema.safeParse(match.params);

        if (!success) return;
        const pattern = match.pattern.path.replace('*', data['*']);
        navigate('/events');
      }
    });
  };

  const selectedProductId = params.productId ? parseInt(params.productId) : (product?.id ?? -1);

  return { selectedProductId, setProduct };
};

export { useSetProductParams };
