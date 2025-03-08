import { Suspense, memo } from 'react';

import { Header, Sidebar } from '@/components';
import { Loading } from '@/components/atoms';

import classes from './root.module.scss';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className={classes.intk}>
      <Sidebar />
      <section className={classes.mainSection}>
        <Header />
        <main className={classes.pageContainer}>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </section>
    </div>
  );
};

export default memo(RootLayout);
