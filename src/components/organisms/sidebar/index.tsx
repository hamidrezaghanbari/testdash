import { Text } from '@smartech/ui';
import { useState } from 'react';

import { groupByEntries } from '$/common';
import { routes } from '$/routes/routes';
import { Render } from '$/utils';

import './sidebar.scss';

import MenuItems from './menu';

const SIDEBAR_DATA = groupByEntries(Object.values(routes.root.children), 'group');

const Sidebar = () => {
  const [menuIds, setMenuIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setMenuIds((ids) => {
      if (ids.includes(id)) return ids.filter((itemId) => itemId !== id);
      return [...ids, id];
    });
  };

  return (
    <div className="sidebar">
      {SIDEBAR_DATA.map(([group, items]) => (
        <div key={group} className="sidebarGroupItem">
          <Render when={group}>
            <Text className="sidebarGroupTitle" size="md" variant="medium">
              {group}
            </Text>
          </Render>
          <MenuItems items={items} menuIds={menuIds} toggle={toggle} />
        </div>
      ))}
    </div>
  );
};

export { Sidebar };
