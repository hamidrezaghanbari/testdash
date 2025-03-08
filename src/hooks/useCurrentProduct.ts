import { useRouteLoaderData } from 'react-router-dom';

import { useApplicationStore } from '@/store';

type ProductData = {
  id: string;
};

const useCurrentProduct = () => {
  const data = useRouteLoaderData<ProductData>('product');

  const product = useApplicationStore((state) => state.product);

  if (data) return data;

  return product;
};

export { useCurrentProduct };
