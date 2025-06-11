import { Suspense, memo } from 'react';

import { Loading } from '@/components/atoms';

import classes from './root.module.scss';

import { Header } from '../header';
import { Sidebar } from '../sidebar';

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
        <footer id="footer" className={classes.footerContainer}></footer>
      </section>
    </div>
  );
};

export default memo(RootLayout);
