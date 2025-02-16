import { Outlet } from 'react-router-dom';

import { useRouteProgress } from '$/hooks';

const Root = () => {
  useRouteProgress();

  return <Outlet />;
};

export { Root };
