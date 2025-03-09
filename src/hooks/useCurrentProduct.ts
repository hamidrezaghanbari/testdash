import { useRouteLoaderData } from 'react-router-dom';

import { useApplicationStore } from '@/store';

type RootLoaderInfo = {
  product: { id: string };
  user: { login: boolean; permissions: string[] };
};

const useCurrentProduct = () => {
  const data = useRouteLoaderData<RootLoaderInfo>('root');

  const product = useApplicationStore((state) => state.product);

  if (data) return data.product;

  return product;
};

export { useCurrentProduct };
