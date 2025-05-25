import { Text } from '@smartech/ui';
import { memo, useState } from 'react';

import { cn } from '@/common';
import { Version } from '@/components/atoms';
import { useDomainStore } from '@/store';
import { Render } from '@/utils';

import './sidebar.scss';

import { data } from './data';
import MenuItems from './sidebarMenu';

const Sidebar = () => {
  const [menuIds, setMenuIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setMenuIds((ids) => {
      if (ids.includes(id)) return ids.filter((itemId) => itemId !== id);
      return [...ids, id];
    });
  };

  const { domain } = useDomainStore();

  return (
    <aside
      // className={cn('sidebar', { 'pointer-events-none blur-sm hover:cursor-not-allowed': !domain })}
      className={cn('sidebar')}
    >
      {data.map(([group, items], index) => (
        <div
          key={group}
          className={cn('sidebarGroupItem', { lastGroup: data.length - 1 === index })}
        >
          <Render when={group}>
            <Text className={'sidebarGroupTitle'} size="md" variant="medium">
              {group}
            </Text>
          </Render>
          <MenuItems items={items} menuIds={menuIds} toggle={toggle} />
        </div>
      ))}
      <Version className={'sidebarVersion'} />
    </aside>
  );
};

const MemoizedSidebar = memo(Sidebar);

export { MemoizedSidebar as Sidebar };

// []
