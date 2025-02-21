import { Icon, IconName, Text } from '@smartech/ui';
import { AnimatePresence, motion } from 'motion/react';
import { Fragment, memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { cn, prefix } from '$/common';
import { ListOfChildren, TRoute } from '$/routes/builder/types';
import { Render } from '$/utils';

import { sidebarVariants } from './variants';

interface MenuProps<T extends TRoute<string>> {
  items: ListOfChildren<T>[];
  layer?: number;
  menuIds: string[];
  toggle: (id: string) => void;
}

interface MenuItemContentProps {
  iconName: IconName;
  title: string;
  isSub: boolean;
  isVisible: boolean;
  shouldToggle: boolean;
}

const FLATTEN_PATHNAMES = ['settings', 'back-office'];

const MenuItemContent = ({
  iconName,
  isSub,
  isVisible,
  shouldToggle,
  title,
}: MenuItemContentProps) => {
  return (
    <Fragment>
      <Icon name={iconName} className={cn('sidebarItemIcon', { sub: isSub })} />
      <Text className="sidebarItemTitle" size="sm" variant="regular">
        {title}
      </Text>
      <Render when={shouldToggle}>
        <Icon className={cn('sidebarItemToggleIcon', { visible: isVisible })} name="chevron-down" />
      </Render>
    </Fragment>
  );
};

const Menu = <T extends TRoute<string>>({ items, menuIds, toggle, layer = 0 }: MenuProps<T>) => {
  const data = useMemo(() => {
    const index = items.findIndex((item) => FLATTEN_PATHNAMES.includes(item.pathname));

    if (index === -1) return items;

    items.splice(index, 1, ...((items[index].children ?? []) as ListOfChildren<T>[]));

    return items;
  }, [items]);

  return (
    <div className="sidebarItems">
      {data.map(({ id, children, title, iconName, href }) => {
        const list = (children ? Object.values(children) : []) as ListOfChildren<T>[];

        const content = (
          <MenuItemContent
            title={title}
            iconName={iconName}
            isSub={layer > 0}
            isVisible={menuIds.includes(id)}
            shouldToggle={list.length > 0}
          />
        );

        return (
          <Fragment key={id}>
            <Render
              when={list.length > 0}
              fallback={
                <NavLink end to={href} className={cn('sidebarItem', prefix(layer, 'layer'))}>
                  {content}
                </NavLink>
              }
            >
              <div className={cn('sidebarItem', prefix(layer, 'layer'))} onClick={() => toggle(id)}>
                {content}
              </div>
            </Render>
            <Render when={list.length > 0}>
              <AnimatePresence initial={false} presenceAffectsLayout>
                {menuIds.includes(id) && (
                  <motion.div
                    key={id}
                    className="sidebar-sub-items"
                    variants={sidebarVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Menu items={list} layer={layer + 1} menuIds={menuIds} toggle={toggle} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Render>
          </Fragment>
        );
      })}
    </div>
  );
};

export default memo(Menu);
