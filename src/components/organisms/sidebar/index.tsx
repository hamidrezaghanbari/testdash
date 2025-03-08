import { Text } from '@smartech/ui';
import { memo, useState } from 'react';

import { cn } from '@/common';
import { Version } from '@/components/atoms';
import { useCurrentProduct } from '@/hooks';
import { Render } from '@/utils';

import classes from './sidebar.module.scss';

import MenuItems from './menu';

const Sidebar = () => {
  const [menuIds, setMenuIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setMenuIds((ids) => {
      if (ids.includes(id)) return ids.filter((itemId) => itemId !== id);
      return [...ids, id];
    });
  };

  return (
    <aside className={classes.sidebar}>
      {/* {sidebarRoutes.map(([group, items], index) => (
        <div
          key={group}
          className={cn(classes.sidebarGroupItem, { lastGroup: sidebarRoutes.length - 1 === index })}
        >
          <Render when={group}>
            <Text className={classes.sidebarGroupTitle} size="md" variant="medium">
              {group}
            </Text>
          </Render>
          <MenuItems items={items} menuIds={menuIds} toggle={toggle} />
        </div>
      ))} */}
      <Version className={classes.sidebarVersion} />
    </aside>
  );
};

const MemoizedSidebar = memo(Sidebar);

export { MemoizedSidebar as Sidebar };

// []
