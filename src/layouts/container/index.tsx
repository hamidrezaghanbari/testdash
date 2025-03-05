import { Text } from '@smartech/ui';
import React, { memo } from 'react';

import { cn } from '$/common';
import { Render } from '$/utils';

import './container.scss';

interface PageProps {
  children: React.ReactNode;
  className?: string;
  headerTitle?: string;
  headerElements?: React.ReactNode;
}

const Page = ({ children, className, headerTitle, headerElements = null }: PageProps) => {
  return (
    <div className="layoutContainer">
      <Render when={headerTitle}>
        <div className="layoutPageHeader">
          <Text variant="semibold" size="xl">
            {headerTitle}
          </Text>
          {headerElements}
        </div>
      </Render>
      <div className={cn('layoutBody', className)}>{children}</div>
    </div>
  );
};

export default memo(Page);
