import { Navigate } from 'react-router-dom';

import { Group, TRoutes } from '../types';
import { analyticsChildren } from './analytics';
import { backofficeChildren } from './backoffice';
import { channelsChildren } from './channels';
import { dataPlatformChildren } from './dataPlatform';
import { appPersonalizationChildren, webPersonalizationChildren } from './personalization';
import { segmentChildren } from './segment';
import { settingsChildren } from './settings';

const routes: TRoutes[] = [
  {
    path: '/',
    title: 'dashboard',
    icon: 'dashboard',
    group: Group.DATA_AND_INSIGHT,
    index: true,
  },
  {
    path: 'user',
    title: 'user',
    icon: 'user-01',
    group: Group.DATA_AND_INSIGHT,
  },
  {
    path: 'analytics',
    title: 'analytics',
    icon: 'bar-chart-square-02',
    group: Group.DATA_AND_INSIGHT,
    children: analyticsChildren,
  },
  {
    path: 'segment',
    title: 'segment',
    icon: 'pie-chart-02',
    group: Group.DATA_AND_INSIGHT,
    children: segmentChildren,
  },
  {
    path: 'dataPlatform',
    title: 'data platform',
    icon: 'database-03',
    group: Group.DATA_AND_INSIGHT,
    children: dataPlatformChildren,
  },
  {
    path: 'overview',
    title: 'overview',
    icon: 'eye',
    group: Group.CAMPAIGN_MANAGER,
  },
  {
    path: 'channels',
    title: 'channels',
    icon: 'server-06',
    group: Group.CAMPAIGN_MANAGER,
    children: channelsChildren,
  },
  {
    path: 'journey',
    title: 'journey',
    icon: 'rocket-02',
    group: Group.CAMPAIGN_MANAGER,
  },
  {
    path: 'relays',
    title: 'relays',
    icon: 'announcement-01',
    group: Group.CAMPAIGN_MANAGER,
  },
  {
    path: 'personalization',
    title: 'web personalization',
    icon: 'monitor-01',
    group: Group.PERSONALIZATION,
    children: webPersonalizationChildren,
  },
  {
    path: 'personalization',
    title: 'app personalization',
    icon: 'phone-01',
    group: Group.PERSONALIZATION,
    children: appPersonalizationChildren,
  },
  {
    path: 'settings',
    group: Group.SETTINGS,
    flatten: true,
    children: settingsChildren,
  },
  {
    path: 'backOffice',
    group: Group.BACK_OFFICE,
    flatten: true,
    children: backofficeChildren,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export { routes };
