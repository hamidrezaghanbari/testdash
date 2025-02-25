import { Text } from '@smartech/ui';
import { useState } from 'react';

import { Version } from '$/components/atoms';
import { sidebarRoutes } from '$/routes/routes';
import { Render } from '$/utils';

import './sidebar.scss';

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
    <div className="sidebar">
      {sidebarRoutes.map(([group, items]) => (
        <div key={group} className="sidebarGroupItem">
          <Render when={group}>
            <Text className="sidebarGroupTitle" size="md" variant="medium">
              {group}
            </Text>
          </Render>
          <MenuItems items={items} menuIds={menuIds} toggle={toggle} />
        </div>
      ))}
      <Version className="mb-2 mt-4" />
    </div>
  );
};

export { Sidebar };
