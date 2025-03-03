import { Text } from '@smartech/ui';
import { memo, useState } from 'react';

import { cn } from '$/common';
import { Version } from '$/components/atoms';
import { sidebarRoutes } from '$/routes/routes';
import { Render } from '$/utils';

import './sidebar.scss';

import MenuItems from './menu';

const Sidebar = () => {
  const [menuIds, setMenuIds] = useState<string[]>([]);

  // TODO: use it later
  //  const routes = useSidebarFilteredRoutes(sidebarRoutes);

  const toggle = (id: string) => {
    setMenuIds((ids) => {
      if (ids.includes(id)) return ids.filter((itemId) => itemId !== id);
      return [...ids, id];
    });
  };

  return (
    <aside className="sidebar">
      {sidebarRoutes.map(([group, items], index) => (
        <div
          key={group}
          className={cn('sidebarGroupItem', { lastGroup: sidebarRoutes.length - 1 === index })}
        >
          <Render when={group}>
            <Text className="sidebarGroupTitle" size="md" variant="medium">
              {group}
            </Text>
          </Render>
          <MenuItems items={items} menuIds={menuIds} toggle={toggle} />
        </div>
      ))}
      <Version className="sidebarVersion" />
    </aside>
  );
};

const MemoizedSidebar = memo(Sidebar);

export { MemoizedSidebar as Sidebar };
