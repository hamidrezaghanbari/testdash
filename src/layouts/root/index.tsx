import { Suspense } from 'react';

import { Sidebar } from '$/components';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="flex size-full">
      <Sidebar />
      <main className="bg-primary-200 flex flex-1">
        <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
      </main>
    </div>
  );
};

export { RootLayout };
