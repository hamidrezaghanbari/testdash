import { IconName } from '@smartech/ui';
import { RouteObject } from 'react-router-dom';

type TExtraRoute = { title: string; group: string; icon: IconName; flatten: boolean };

type TRequiredProps = { id: string; path: string; href: string };

type TRouteProps = Readonly<Partial<TExtraRoute>>;

type NoChildrenRoutes = Omit<RouteObject, 'children'>;

type TRoutes = NoChildrenRoutes & TRouteProps & { children?: TRoutes[]; permissions?: string[] };

type TExtraRequiredProps = TRequiredProps & { children?: SidebarRoutes[]; permissions?: string[] };

type SidebarRoutes = NoChildrenRoutes & TRouteProps & TExtraRequiredProps;

enum Group {
  DATA_AND_INSIGHT = 'data and insight',
  CAMPAIGN_MANAGER = 'campaign maanger',
  PERSONALIZATION = 'personalization',
  SETTINGS = 'settings',
  BACK_OFFICE = 'back office',
}

export type { SidebarRoutes, TRoutes };

export { Group };
