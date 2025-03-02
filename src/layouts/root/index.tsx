import { Suspense, memo } from 'react';

import { Header, Sidebar } from '$/components';
import { Loading } from '$/components/atoms';

import './root.scss';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="__main">
      <Sidebar />
      <section className="__mainSection">
        <Header />
        <main className="pageContainer">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </section>
    </div>
  );
};

export default memo(RootLayout);
