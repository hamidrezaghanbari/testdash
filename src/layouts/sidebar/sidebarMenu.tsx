import { AnimatePresence, motion } from 'motion/react';
import { Fragment, memo } from 'react';
import { NavLink, generatePath, useLocation } from 'react-router-dom';

import { cn, prefix } from '@/common';
import { Render } from '@/utils';

import './sidebar.scss';

import { MenuItemContent } from './content';
import { SidebarData } from './data';
import { sidebarVariants } from './variants';

interface SidebarMenuProps {
  items: SidebarData[];
  layer?: number;
  menuIds: string[];
  toggle: (id: string) => void;
}
const SidebarMenu = ({ items, menuIds, toggle, layer = 0 }: SidebarMenuProps) => {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname.startsWith(href);
  };

  return (
    <div className={'sidebarItems'}>
      {items.map(({ id, children = [], title, icon, href }) => {
        const menuHref = href;
        // const menuHref = product?.id ? generatePath(href, { productId: product?.id }) : href;

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
                  tabIndex={-1}
                  to={menuHref}
                  className={({ isActive }) =>
                    cn('sidebarItem', prefix(layer, 'layer'), { active: isActive })
                  }
                  viewTransition
                  end
                >
                  {content}
                </NavLink>
              }
            >
              <div
                className={cn('sidebarItem', prefix(layer, 'layer'), {
                  active: isActive(menuHref),
                })}
                onClick={() => toggle(id)}
              >
                {content}
              </div>
            </Render>
            <Render when={children.length > 0}>
              <AnimatePresence initial={false} presenceAffectsLayout>
                {menuIds.includes(id) && (
                  <motion.div
                    key={id}
                    className={'sidebarSubItems'}
                    variants={sidebarVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <SidebarMenu
                      items={children}
                      layer={layer + 1}
                      menuIds={menuIds}
                      toggle={toggle}
                    />
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

export default memo(SidebarMenu);
