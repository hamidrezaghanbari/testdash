import { useRouteLoaderData } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';

import { ApplicationState, useApplicationStore } from '@/store';

const useCurrentProduct = () => {
  const data = useRouteLoaderData<ApplicationState>('root');

  const product = useApplicationStore(useShallow((state) => state.product));

  if (data) return data.product;

  return product;
};

export { useCurrentProduct };
