import { Outlet } from 'react-router-dom';

import { useRouteProgress } from '@/hooks';
import RootLayout from '@/layouts/root';

const Events = () => {
  useRouteProgress();

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export { Events };
