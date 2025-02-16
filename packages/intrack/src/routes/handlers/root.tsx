import { AnimatePresence } from 'motion/react';
import { Outlet } from 'react-router-dom';

import { RootLayout } from '$/components';
import { useRouteProgress } from '$/hooks';

const Root = () => {
  useRouteProgress();

  return (
    <RootLayout>
      <AnimatePresence initial mode="wait">
        <Outlet />
      </AnimatePresence>
    </RootLayout>
  );
};

export { Root };
