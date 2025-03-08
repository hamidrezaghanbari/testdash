import { Text } from '@smartech/ui';
import React, { memo } from 'react';

import { cn } from '@/common';
import { Render } from '@/utils';

import classes from './container.module.scss';

interface PageProps {
  children: React.ReactNode;
  className?: string;
  headerTitle?: string;
  headerElements?: React.ReactNode;
}

const Page = ({ children, className, headerTitle, headerElements = null }: PageProps) => {
  return (
    <div className={classes.layoutContainer}>
      <Render when={headerTitle}>
        <div className={classes.layoutPageHeader}>
          <Text variant="semibold" size="xl">
            {headerTitle}
          </Text>
          {headerElements}
        </div>
      </Render>
      <div className={cn(classes.layoutBody, className)}>{children}</div>
    </div>
  );
};

export default memo(Page);
