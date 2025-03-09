import { Icon, IconName, Text } from '@smartech/ui';
import { Fragment, memo } from 'react';

import { cn } from '@/common';
import { Render } from '@/utils';

import './sidebar.scss';

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
        {(name) => <Icon name={name} className={cn('sidebarItemIcon', { sub: isSub })} />}
      </Render>
      <Text className={'sidebarItemTitle'} size="sm" variant="regular">
        {title}
      </Text>
      <Render when={shouldToggle}>
        <Icon className={cn('sidebarItemToggleIcon', { visible: isVisible })} name="chevron-down" />
      </Render>
    </Fragment>
  );
};

const MemoizedContent = memo(MenuItemContent);

export { MemoizedContent as MenuItemContent };
