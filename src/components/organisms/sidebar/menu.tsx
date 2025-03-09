import { AnimatePresence, motion } from 'motion/react';
import { Fragment, memo } from 'react';
import { NavLink, generatePath } from 'react-router-dom';

import { cn, prefix } from '@/common';
import { useCurrentProduct } from '@/hooks';
import { Render } from '@/utils';

import classes from './sidebar.module.scss';

import { MenuItemContent } from './content';
import { SidebarData } from './data';
import { sidebarVariants } from './variants';

interface MenuProps {
  items: SidebarData[];
  layer?: number;
  menuIds: string[];
  toggle: (id: string) => void;
}
const Menu = ({ items, menuIds, toggle, layer = 0 }: MenuProps) => {
  const product = useCurrentProduct();

  return (
    <div className={classes.sidebarItems}>
      {items.map(({ id, children = [], title, icon, href }) => {
        const menuHref = generatePath(href, { productId: product?.id });

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
                  to={menuHref}
                  className={cn(classes.sidebarItem, prefix(layer, 'layer'))}
                  viewTransition
                  end
                >
                  {content}
                </NavLink>
              }
            >
              <div
                className={cn(classes.sidebarItem, prefix(layer, 'layer'))}
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
                    className={classes.sidebarSubItems}
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
