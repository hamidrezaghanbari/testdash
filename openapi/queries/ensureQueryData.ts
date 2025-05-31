// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { GoalsService, SegmentsService, SitesService } from "../requests/services.gen";
import * as Common from "./common";
export const ensureUseSitesServiceGetApiV1SitesUserByUserIdData = (queryClient: QueryClient, { limit, skip, userId }: {
  limit?: number;
  skip?: number;
  userId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseSitesServiceGetApiV1SitesUserByUserIdKeyFn({ limit, skip, userId }), queryFn: () => SitesService.getApiV1SitesUserByUserId({ limit, skip, userId }) });
export const ensureUseSitesServiceGetApiV1SitesDomainByDomainData = (queryClient: QueryClient, { domain, userId }: {
  domain: string;
  userId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseSitesServiceGetApiV1SitesDomainByDomainKeyFn({ domain, userId }), queryFn: () => SitesService.getApiV1SitesDomainByDomain({ domain, userId }) });
export const ensureUseGoalsServiceGetApiV1GoalsSiteDomainByDomainData = (queryClient: QueryClient, { category, domain, goalType, limit, skip, userId }: {
  category?: string;
  domain: string;
  goalType?: string;
  limit?: number;
  skip?: number;
  userId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainKeyFn({ category, domain, goalType, limit, skip, userId }), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomain({ category, domain, goalType, limit, skip, userId }) });
export const ensureUseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameData = (queryClient: QueryClient, { domain, name, userId }: {
  domain: string;
  name: string;
  userId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameKeyFn({ domain, name, userId }), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomainGoalByName({ domain, name, userId }) });
export const ensureUseSegmentsServiceGetApiV1SegmentsData = (queryClient: QueryClient, { dataType, domain, limit, skip, userId }: {
  dataType?: string;
  domain: string;
  limit?: number;
  skip?: number;
  userId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsKeyFn({ dataType, domain, limit, skip, userId }), queryFn: () => SegmentsService.getApiV1Segments({ dataType, domain, limit, skip, userId }) });
export const ensureUseSegmentsServiceGetApiV1SegmentsByDomainByNameData = (queryClient: QueryClient, { domain, name, userId }: {
  domain: string;
  name: string;
  userId: string;
}) => queryClient.ensureQueryData({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsByDomainByNameKeyFn({ domain, name, userId }), queryFn: () => SegmentsService.getApiV1SegmentsByDomainByName({ domain, name, userId }) });
