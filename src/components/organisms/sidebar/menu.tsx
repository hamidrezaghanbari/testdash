import { Icon, Text } from '@smartech/ui';
import { AnimatePresence, motion } from 'motion/react';
import { Fragment, memo, useState } from 'react';

import { cn, prefix } from '$/common';
import { Render } from '$/utils';

import './sidebar.scss';

import { SidebarDataset } from './dataset';
import { sidebarVariants } from './variants';

interface SidebarMenuProps {
  data: SidebarDataset[];
  /**
   * @private
   */
  readonly layer?: number;
  /**
   * @private
   */
  readonly ids?: string[];
}

const SidebarMenu = ({ data, layer = 0, ids = [] }: SidebarMenuProps) => {
  const [itemIds, setItemIds] = useState<string[]>(ids);

  const toggleVisible = (id: string) => {
    setItemIds((previous) => {
      if (previous.includes(id)) {
        return previous.filter((itemId) => itemId !== id);
      }

      return [...previous, id];
    });
  };

  return (
    <div className="sidebarGroupItem">
      <Render when={layer === 0}>
        <Text className="sidebarGroupTitle" size="md" variant="medium">
          data and insight
        </Text>
      </Render>
      <div className="sidebarItems">
        {data.map(({ id, title, iconName, children = [] }) => (
          <Fragment key={id}>
            <div
              className={cn('sidebarItem', prefix(layer, 'layer'))}
              onClick={() => {
                if (children.length > 0) return toggleVisible(id);
              }}
            >
              <Icon name={iconName as any} className={cn('sidebarItemIcon', { sub: layer > 0 })} />
              <Text className="sidebarItemTitle" size={layer ? 'sm' : 'md'} variant="medium">
                {title}
              </Text>
              <Render when={children.length > 0}>
                <Icon
                  className={cn('sidebarItemToggleIcon', { visible: itemIds.includes(id) })}
                  name="chevron-down"
                />
              </Render>
            </div>
            <Render when={children.length > 0}>
              <AnimatePresence initial={false} presenceAffectsLayout>
                {itemIds.includes(id) && (
                  <motion.div
                    key={id}
                    className="sidebar-sub-items"
                    variants={sidebarVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <SidebarMenu data={children} layer={layer + 1} ids={itemIds} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Render>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(SidebarMenu);
