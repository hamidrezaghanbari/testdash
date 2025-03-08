import { memo } from 'react';

import { useDocumentTitle } from '@/hooks';

import classes from './header.module.scss';

const Header = () => {
  useDocumentTitle();

  return <header className={classes.mainHeader}>header</header>;
};

const MemoizedHeader = memo(Header);

export { MemoizedHeader as Header };
