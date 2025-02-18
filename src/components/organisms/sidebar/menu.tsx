import { Text } from '@smartech/ui';
import { memo, useState } from 'react';

import { Render } from '$/utils';

import './sidebar.scss';

import { SIDEBAR_DATA } from './dataset';
import MenuItems from './menuItems';

const SidebarMenu = () => {
  const [menuIds, setMenuIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setMenuIds((previous) => {
      if (previous.includes(id)) return previous.filter((itemId) => itemId !== id);
      return [...previous, id];
    });
  };

  return (
    <div className="sidebarGroupItem">
      {SIDEBAR_DATA.map(([group, items]) => (
        <div className="flex flex-col gap-3">
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

export default memo(SidebarMenu);
