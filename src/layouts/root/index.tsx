import { Suspense, memo } from 'react';

import { Sidebar } from '$/components';
import { Loading } from '$/components/atoms';

import './root.scss';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="flex size-full">
      <Sidebar />
      <main className="page-container">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </div>
  );
};

export default memo(RootLayout);
