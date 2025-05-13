import { Navigate, Outlet, generatePath } from 'react-router-dom';

import { useCurrentProduct, useRouteProgress } from '@/hooks';
import RootLayout from '@/layouts/root';

const Root = () => {
  useRouteProgress();

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

const RootRedirection = () => {
  const product = useCurrentProduct();

  if (product) {
    const { id } = product;

    return <Navigate to={generatePath('product/:id', { id: id.toString() })} replace />;
  }

  return <Navigate to="product" replace />;
};

export { Root, RootRedirection };
