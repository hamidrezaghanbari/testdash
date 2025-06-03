import { Text } from '@smartech/ui';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LogoSvg from '@/assets/images/logo.svg';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!domain) navigate('/products');
  }, [domain]);

  return (
    <aside
      className={cn('sidebar', { 'pointer-events-none blur-sm hover:cursor-not-allowed': !domain })}
    >
      {data.map(([group, items], index) => (
        <div
          key={group}
          className={cn('sidebarGroupItem', { lastGroup: data.length - 1 === index })}
        >
          <Render when={group}>
            <Text
              className={'sidebarGroupTitle inline-flex items-center pl-2'}
              size="md"
              variant="medium"
            >
              <img
                src={LogoSvg}
                alt="Logo"
                style={{ width: '24px', height: '24px', marginRight: '8px' }}
              />
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
