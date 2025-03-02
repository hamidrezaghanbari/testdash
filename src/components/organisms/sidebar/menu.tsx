import { AnimatePresence, motion } from 'motion/react';
import { Fragment, memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

import { cn, prefix } from '$/common';
import { SidebarRoutes } from '$/routes/types';
import { Render } from '$/utils';

import { MenuItemContent } from './content';
import { sidebarVariants } from './variants';

interface MenuProps {
  items: SidebarRoutes[];
  layer?: number;
  menuIds: string[];
  toggle: (id: string) => void;
}

const Menu = ({ items, menuIds, toggle, layer = 0 }: MenuProps) => {
  const data = useMemo(() => {
    const index = items.findIndex((item) => item.flatten);

    if (index === -1) return items;

    items.splice(index, 1, ...(items[index].children ?? []));

    return items;
  }, [items]);

  return (
    <div className="sidebarItems">
      {data.map(({ id, children = [], title, icon, href }) => {
        const content = (
          <MenuItemContent
            title={title}
            iconName={icon}
            isSub={layer > 0}
            isVisible={menuIds.includes(id)}
            shouldToggle={children.length > 0}
          />
        );

        return (
          <Fragment key={id}>
            <Render
              when={children.length > 0}
              fallback={
                <NavLink
                  to={href}
                  className={cn('sidebarItem', prefix(layer, 'layer'))}
                  viewTransition
                  end
                >
                  {content}
                </NavLink>
              }
            >
              <div className={cn('sidebarItem', prefix(layer, 'layer'))} onClick={() => toggle(id)}>
                {content}
              </div>
            </Render>
            <Render when={children.length > 0}>
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
                    <Menu items={children} layer={layer + 1} menuIds={menuIds} toggle={toggle} />
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
