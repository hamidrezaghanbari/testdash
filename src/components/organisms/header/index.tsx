import { memo } from 'react';

import { useDocumentTitle } from '$/hooks';

import './header.scss';

const Header = () => {
  useDocumentTitle();

  return <header className="mainHeader">header</header>;
};

const MemoizedHeader = memo(Header);

export { MemoizedHeader as Header };
