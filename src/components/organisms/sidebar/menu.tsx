import { Icon, Text } from '@smartech/ui';
import { AnimatePresence, motion } from 'motion/react';
import { Fragment, memo } from 'react';

import { cn, prefix } from '$/common';
import { RouteDefinition } from '$/routes/builder/types';
import { Render } from '$/utils';

import { sidebarVariants } from './variants';

interface MenuProps<T extends RouteDefinition<string>> {
  items: T[];
  layer?: number;
  menuIds: string[];
  toggle: (id: string) => void;
}

const Menu = <T extends RouteDefinition<string>>({
  items,
  menuIds,
  toggle,
  layer = 0,
}: MenuProps<T>) => {
  return (
    <div className="sidebarItems">
      {items.map(({ id, children, title, iconName }) => {
        const list = (children ? Object.values(children) : []) as T[];

        return (
          <Fragment key={id}>
            <div
              className={cn('sidebarItem', prefix(layer, 'layer'))}
              onClick={() => {
                if (list.length > 0) return toggle(id);
              }}
            >
              <Icon name={iconName} className={cn('sidebarItemIcon', { sub: layer > 0 })} />
              <Text className="sidebarItemTitle" size="sm" variant="regular">
                {title}
              </Text>
              <Render when={list.length > 0}>
                <Icon
                  className={cn('sidebarItemToggleIcon', { visible: menuIds.includes(id) })}
                  name="chevron-down"
                />
              </Render>
            </div>
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
