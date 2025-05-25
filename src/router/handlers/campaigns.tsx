import { Outlet } from 'react-router-dom';

import { useRouteProgress } from '@/hooks';
import RootLayout from '@/layouts/root';

const Campaigns = () => {
  useRouteProgress();

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export { Campaigns };
