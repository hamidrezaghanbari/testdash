import { Icon, IconName, Text } from '@smartech/ui';
import { Fragment, memo } from 'react';

import { cn } from '@/common';
import { Render } from '@/utils';

import classes from './sidebar.module.scss';

interface MenuItemContentProps {
  iconName?: IconName;
  title?: string;
  isSub: boolean;
  isVisible: boolean;
  shouldToggle: boolean;
}

const MenuItemContent = ({
  iconName,
  isSub,
  isVisible,
  shouldToggle,
  title,
}: MenuItemContentProps) => {
  return (
    <Fragment>
      <Render when={iconName}>
        {(name) => <Icon name={name} className={cn(classes.sidebarItemIcon, { sub: isSub })} />}
      </Render>
      <Text className={classes.sidebarItemTitle} size="sm" variant="regular">
        {title}
      </Text>
      <Render when={shouldToggle}>
        <Icon
          className={cn(classes.sidebarItemToggleIcon, { visible: isVisible })}
          name="chevron-down"
        />
      </Render>
    </Fragment>
  );
};

const MemoizedContent = memo(MenuItemContent);

export { MemoizedContent as MenuItemContent };
