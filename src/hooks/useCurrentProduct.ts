import { useRouteLoaderData } from 'react-router-dom';

import { RootApplicationStore, useApplicationStore } from '@/store';

const useCurrentProduct = () => {
  const data = useRouteLoaderData<RootApplicationStore>('root');

  const product = useApplicationStore((state) => state.product);

  if (data) return data.product;

  return product;
};

export { useCurrentProduct };
