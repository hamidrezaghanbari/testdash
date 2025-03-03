import { memo } from 'react';

import { cn } from '$/common';

import './container.scss';

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => {
  return <div className={cn('layoutContainer', className)}>{children}</div>;
};

export default memo(Page);
