import { useMemo } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import { ApplicationState, useApplicationStore } from '@/store';

import { useCurrentUser } from './useCurrentUser';

const useCurrentProduct = () => {
  const data = useRouteLoaderData<ApplicationState>('root');

  const { productId } = useParams();

  const { products } = useCurrentUser();

  const product = useApplicationStore(useShallow((state) => state.product));

  const currentProduct = useMemo(
    () => products.find((p) => String(p.id) === productId),
    [products, productId],
  );

  if (currentProduct) return currentProduct;

  if (product) return product;

  return data ? data.product : null;
};

export { useCurrentProduct };
