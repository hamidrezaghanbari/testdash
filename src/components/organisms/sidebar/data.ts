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
    'data and insight',
    addUniqueIds([
      {
        title: 'dashboard',
        icon: 'dashboard',
        group: 'data and insight',
        children: [],
        href: '/',
      },
      {
        title: 'user',
        icon: 'user-01',
        group: 'data and insight',
        children: [],
        href: '/product/:productId/users/overview',
      },
      {
        title: 'analytics',
        icon: 'bar-chart-square-02',
        group: 'data and insight',
        children: [
          {
            title: 'event',
            icon: 'rocket-01',
            children: [],
            href: '/product/:productId/analytics/event',
          },
          {
            title: 'funnel',
            icon: 'filter-funnel-01',
            children: [],
            href: '/product/:productId/analytics/funnel',
          },
          {
            title: 'cohort',
            icon: 'data',
            children: [],
            href: '/product/:productId/analytics/cohort',
          },
          {
            title: 'uninstall',
            icon: 'log-out-01',
            children: [],
            href: '/product/:productId/analytics/uninstall',
          },
        ],
        href: '/analytics',
      },
      {
        title: 'segment',
        icon: 'pie-chart-02',
        group: 'data and insight',
        children: [
          {
            title: 'live segment',
            icon: 'bar-chart-square-02',
            children: [],
            href: '/product/:productId/segment/live',
          },
          {
            title: 'static segment',
            icon: 'bar-chart-square-02',
            children: [],
            href: '/product/:productId/segment/static',
          },
        ],
        href: '/segment',
      },
      {
        title: 'data platform',
        icon: 'database-03',
        group: 'data and insight',
        children: [
          {
            title: 'data management',
            icon: 'bar-chart-square-02',
            permissions: [],
            children: [],
            href: '/product/:productId/dataPlatform/management',
          },
          {
            title: 'upload data',
            icon: 'upload-cloud-01',
            permissions: [],
            children: [],
            href: '/product/:productId/dataPlatform/uploadData',
          },
          {
            title: 'alert',
            icon: 'bell-ringing-03',
            permissions: [],
            children: [],
            href: '/product/:productId/dataPlatform/alert',
          },
        ],
        href: '/dataPlatform',
      },
    ]),
  ],
  [
    'campaign maanger',
    addUniqueIds([
      {
        title: 'overview',
        icon: 'eye',
        group: 'campaign maanger',
        children: [],
        href: '/product/:productId/insights/overview',
      },
      {
        title: 'channels',
        icon: 'server-06',
        group: 'campaign maanger',
        children: [],
        href: '/product/:productId/channels',
      },
      {
        title: 'journey',
        icon: 'rocket-02',
        group: 'campaign maanger',
        children: [],
        href: '/product/:productId/insights/journey',
      },
      {
        title: 'relays',
        icon: 'announcement-01',
        group: 'campaign maanger',
        children: [],
        href: '/product/:productId/insights/relays',
      },
    ]),
  ],
  [
    'personalization',
    addUniqueIds([
      {
        title: 'web personalization',
        icon: 'monitor-01',
        group: 'personalization',
        children: [
          {
            title: 'on site',
            icon: 'monitor-02',
            children: [],
            href: '/product/:productId/personalization/onSite',
          },
          {
            title: 'survey',
            icon: 'bar-chart-square-02',
            children: [],
            href: '/product/:productId/personalization/survey',
          },
        ],
        href: '/personalization',
      },
      {
        title: 'app personalization',
        icon: 'phone-01',
        group: 'personalization',
        children: [
          {
            title: 'in app',
            icon: 'phone-02',
            children: [],
            href: '/product/:productId/personalization/inApp',
          },
        ],
        href: '/personalization',
      },
    ]),
  ],
  [
    'settings',
    addUniqueIds([
      {
        title: 'channel',
        icon: 'server-06',
        children: [],
        href: '/product/:productId/settings/channel',
      },
      {
        title: 'sdk',
        icon: 'layers-three-01',
        children: [],
        href: '/product/:productId/settings/sdk',
      },
      {
        title: 'webhook',
        icon: 'Webhook',
        children: [],
        href: '/product/:productId/settings/webhook',
      },
      {
        title: 'audit log',
        icon: 'file-search-02',
        children: [],
        href: '/product/:productId/settings/auditLog',
      },
      {
        title: 'rest api',
        icon: 'file-lock-02',
        children: [],
        href: '/product/:productId/settings/restApi',
      },
      {
        title: 'team',
        icon: 'users-01',
        children: [],
        href: '/product/:productId/settings/team',
      },
      {
        title: 'billing',
        icon: 'receipt',
        children: [],
        href: '/product/:productId/settings/billing',
      },
    ]),
  ],
  [
    'back office',
    addUniqueIds([
      {
        title: 'financial',
        icon: 'bank-note-01',
        children: [],
        href: '/backOffice/financial',
        permissions: ['back'],
      },
      {
        title: 'role',
        icon: 'image-user-check',
        children: [],
        href: '/backOffice/role',
        permissions: ['back'],
      },
      {
        title: 'users',
        icon: 'user-square',
        children: [],
        href: '/backOffice/users',
        permissions: ['back'],
      },
      {
        title: 'manage products',
        icon: 'package-check',
        children: [],
        href: '/backOffice/manageProducts',
        permissions: ['back'],
      },
      {
        title: 'create product',
        icon: 'package-plus',
        children: [],
        href: '/backOffice/createProduct',
        permissions: ['back'],
      },
      {
        title: 'contracts',
        icon: 'file-check-02',
        children: [],
        href: '/backOffice/contracts',
        permissions: ['back'],
      },
      {
        title: 'file storage',
        icon: 'server-04',
        children: [],
        href: '/backOffice/fileStorage',
        permissions: ['back'],
      },
      {
        title: 'configuration',
        icon: 'settings-01',
        children: [],
        href: '/backOffice/configuration',
        permissions: ['back'],
      },
    ]),
  ],
] as const;
