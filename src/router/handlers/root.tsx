import { Navigate, Outlet, generatePath } from 'react-router-dom';

import { useCurrentProduct, useRouteProgress } from '@/hooks';
import RootLayout from '@/layouts/root';
import { useDomainStore } from '@/store';

const Root = () => {
  useRouteProgress();

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

const RootRedirection = () => {
  // const product = useCurrentProduct();
  // if (product) {
  //   const { id } = product;
  //   return <Navigate to={generatePath('product/:id', { id: id.toString() })} replace />;
  // }

  const { domain } = useDomainStore();

  return <Navigate to={domain ? 'events' : 'products'} replace />;
};

export { Root, RootRedirection };
