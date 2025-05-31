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
      // {
      //   title: 'dashboard',
      //   icon: 'home-line',
      //   children: [],
      //   href: '/product/:productId',
      //   permissions: [
      //     'ROLE_MANAGEMENT_DASHBOARD_ALL',
      //     'ROLE_MANAGEMENT_DASHBOARD_USER',
      //     'ROLE_MANAGEMENT_DASHBOARD_EVENT',
      //     'ROLE_MANAGEMENT_DASHBOARD_COMMUNICATION',
      //     'ROLE_MANAGEMENT_DASHBOARD_REVENUE',
      //     'ROLE_MANAGEMENT_DASHBOARD_CHANNEL',
      //     'ROLE_MANAGEMENT_DASHBOARD_INVOICE',
      //     'ROLE_MANAGEMENT_DASHBOARD_PROJECT',
      //   ],
      // },
      {
        title: 'Event Tracking',
        icon: 'chart-breakout-square',
        children: [],
        href: '/events',
        permissions: [
          'ROLE_PRODUCT_USER_OVERVIEW',
          'ROLE_PRODUCT_USER_ANALYSE',
          'ROLE_PRODUCT_USER_LIST',
        ],
      },
      {
        title: 'Campaign Tracking',
        icon: 'target-04',
        children: [],
        href: '/campaigns',
        permissions: [
          'ROLE_PRODUCT_EVENTS_OVERVIEW',
          'ROLE_PRODUCT_FUNNEL_LIST',
          'ROLE_COHORT_LIST',
        ],
      },
      {
        title: 'Segments',
        icon: 'users-01',
        children: [],
        href: '/segment',
        permissions: ['ROLE_PRODUCT_SEGMENT_LIST'],
      },
      // {
      //   title: 'Pages and Screens',
      //   icon: 'layout-alt-02',
      //   children: [],
      //   href: '/dataPlatform',
      // },
      // {
      //   title: 'Settings',
      //   icon: 'settings-02',
      //   children: [],
      //   href: '/dataPlatform',
      // },
    ]),
  ],
] as const;
