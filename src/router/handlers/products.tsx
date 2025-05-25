import { Outlet } from 'react-router-dom';

import { useRouteProgress } from '@/hooks';
import RootLayout from '@/layouts/root';

const Products = () => {
  useRouteProgress();

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export { Products };
