// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { type QueryClient } from "@tanstack/react-query";
import { GoalsService, SegmentsService, SitesService } from "../requests/services.gen";
import * as Common from "./common";
export const prefetchUseSitesServiceGetApiV1SitesUserByUserId = (queryClient: QueryClient, { limit, skip, userId }: {
  limit?: number;
  skip?: number;
  userId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseSitesServiceGetApiV1SitesUserByUserIdKeyFn({ limit, skip, userId }), queryFn: () => SitesService.getApiV1SitesUserByUserId({ limit, skip, userId }) });
export const prefetchUseSitesServiceGetApiV1SitesDomainByDomain = (queryClient: QueryClient, { domain }: {
  domain: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseSitesServiceGetApiV1SitesDomainByDomainKeyFn({ domain }), queryFn: () => SitesService.getApiV1SitesDomainByDomain({ domain }) });
export const prefetchUseGoalsServiceGetApiV1GoalsSiteDomainByDomain = (queryClient: QueryClient, { domain, goalType, limit, skip }: {
  domain: string;
  goalType?: string;
  limit?: number;
  skip?: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainKeyFn({ domain, goalType, limit, skip }), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomain({ domain, goalType, limit, skip }) });
export const prefetchUseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByName = (queryClient: QueryClient, { domain, name }: {
  domain: string;
  name: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameKeyFn({ domain, name }), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomainGoalByName({ domain, name }) });
export const prefetchUseSegmentsServiceGetApiV1Segments = (queryClient: QueryClient, { dataType, domain, limit, skip }: {
  dataType?: string;
  domain: string;
  limit?: number;
  skip?: number;
}) => queryClient.prefetchQuery({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsKeyFn({ dataType, domain, limit, skip }), queryFn: () => SegmentsService.getApiV1Segments({ dataType, domain, limit, skip }) });
export const prefetchUseSegmentsServiceGetApiV1SegmentsByDomainByName = (queryClient: QueryClient, { domain, name }: {
  domain: string;
  name: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsByDomainByNameKeyFn({ domain, name }), queryFn: () => SegmentsService.getApiV1SegmentsByDomainByName({ domain, name }) });
