import { memo } from 'react';

import { useDocumentTitle } from '$/hooks';

import './header.scss';

const Header = () => {
  useDocumentTitle();

  return <div className="main-header">header</div>;
};

const MemoizedHeader = memo(Header);

export { MemoizedHeader as Header };
