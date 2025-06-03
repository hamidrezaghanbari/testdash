import { IconName } from '@smartech/ui';
import { v4 as uuidv4 } from 'uuid';

type SidebarItem = {
  id?: string;
  title: string;
  icon: IconName;
  children: SidebarItem[];
  href: string;
  group?: string;
  permissions?: string[];
};
export type SidebarData = Omit<SidebarItem, 'id' | 'children'> & {
  id: string;
  children: SidebarData[];
};

export type SidebarEntries = [string, SidebarData[]][];

const addUniqueIds = (items: SidebarItem[]): SidebarData[] => {
  return items.map((item) => ({
    ...item,
    id: uuidv4(),
    children: addUniqueIds(item.children || []),
  }));
};
export const data = [
  [
    'Analytics',
    addUniqueIds([
      {
        title: 'Event Tracking',
        icon: 'chart-breakout-square',
        children: [],
        href: '/events',
        permissions: [],
      },
      {
        title: 'Campaign Tracking',
        icon: 'target-04',
        children: [],
        href: '/campaigns',
        permissions: [],
      },
      {
        title: 'Segments',
        icon: 'users-01',
        children: [],
        href: '/segment',
        permissions: [],
      },
      {
        title: 'Pages and Screens',
        icon: 'layout-alt-02',
        children: [],
        href: '/pages-screens',
        permissions: [],
      },
    ]),
  ],
] as const;
