import { useRouteLoaderData } from 'react-router-dom';

type ProductData = {
  id: string;
};

const useCurrentProduct = () => {
  return useRouteLoaderData<ProductData>('product');
};

export { useCurrentProduct };
