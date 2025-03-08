import { Outlet } from 'react-router-dom';

import { useRouteProgress } from '@/hooks';

const Account = () => {
  useRouteProgress();

  return <Outlet />;
};

export { Account };
