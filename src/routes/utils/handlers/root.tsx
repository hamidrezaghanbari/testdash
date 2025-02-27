import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { CONSTANTS } from '$/constants';
import { useRouteProgress } from '$/hooks';
import RootLayout from '$/layouts/root';

const Root = () => {
  useRouteProgress();

  useEffect(() => {
    sessionStorage.removeItem(CONSTANTS.OTP_TIME);
  }, []);

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export { Root };
