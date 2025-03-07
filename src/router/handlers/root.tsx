import { Navigate, Outlet } from 'react-router-dom';

import { useRouteProgress } from '$/hooks';
import RootLayout from '$/layouts/root';

const Root = () => {
  useRouteProgress();

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

const RootRedirection = () => {
  return <Navigate to="product" replace />;
};

export { Root, RootRedirection };
