// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { GoalsService, SegmentsService, SitesService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseSitesServiceGetApiV1SitesUserByUserId = (queryClient: QueryClient, { limit, skip, userId }: {
  limit?: number;
  skip?: number;
  userId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseSitesServiceGetApiV1SitesUserByUserIdKeyFn({ limit, skip, userId }), queryFn: () => SitesService.getApiV1SitesUserByUserId({ limit, skip, userId }) });
export const prefetchUseSitesServiceGetApiV1SitesDomainByDomain = (queryClient: QueryClient, { domain, userId }: {
  domain: string;
  userId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseSitesServiceGetApiV1SitesDomainByDomainKeyFn({ domain, userId }), queryFn: () => SitesService.getApiV1SitesDomainByDomain({ domain, userId }) });
export const prefetchUseGoalsServiceGetApiV1GoalsSiteDomainByDomain = (queryClient: QueryClient, { domain, goalType, limit, skip, userId }: {
  domain: string;
  goalType?: string;
  limit?: number;
  skip?: number;
  userId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainKeyFn({ domain, goalType, limit, skip, userId }), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomain({ domain, goalType, limit, skip, userId }) });
export const prefetchUseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByName = (queryClient: QueryClient, { domain, name, userId }: {
  domain: string;
  name: string;
  userId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameKeyFn({ domain, name, userId }), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomainGoalByName({ domain, name, userId }) });
export const prefetchUseSegmentsServiceGetApiV1Segments = (queryClient: QueryClient, { dataType, domain, limit, skip, userId }: {
  dataType?: string;
  domain: string;
  limit?: number;
  skip?: number;
  userId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsKeyFn({ dataType, domain, limit, skip, userId }), queryFn: () => SegmentsService.getApiV1Segments({ dataType, domain, limit, skip, userId }) });
export const prefetchUseSegmentsServiceGetApiV1SegmentsByDomainByName = (queryClient: QueryClient, { domain, name, userId }: {
  domain: string;
  name: string;
  userId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsByDomainByNameKeyFn({ domain, name, userId }), queryFn: () => SegmentsService.getApiV1SegmentsByDomainByName({ domain, name, userId }) });
