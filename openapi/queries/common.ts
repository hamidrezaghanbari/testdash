// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryResult } from "@tanstack/react-query";
import { AnalyticsService, GoalsService, SegmentsService, SitesService } from "../requests/services.gen";
export type SitesServiceGetApiV1SitesUserByUserIdDefaultResponse = Awaited<ReturnType<typeof SitesService.getApiV1SitesUserByUserId>>;
export type SitesServiceGetApiV1SitesUserByUserIdQueryResult<TData = SitesServiceGetApiV1SitesUserByUserIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSitesServiceGetApiV1SitesUserByUserIdKey = "SitesServiceGetApiV1SitesUserByUserId";
export const UseSitesServiceGetApiV1SitesUserByUserIdKeyFn = ({ limit, skip, userId }: {
  limit?: number;
  skip?: number;
  userId: string;
}, queryKey?: Array<unknown>) => [useSitesServiceGetApiV1SitesUserByUserIdKey, ...(queryKey ?? [{ limit, skip, userId }])];
export type SitesServiceGetApiV1SitesDomainByDomainDefaultResponse = Awaited<ReturnType<typeof SitesService.getApiV1SitesDomainByDomain>>;
export type SitesServiceGetApiV1SitesDomainByDomainQueryResult<TData = SitesServiceGetApiV1SitesDomainByDomainDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSitesServiceGetApiV1SitesDomainByDomainKey = "SitesServiceGetApiV1SitesDomainByDomain";
export const UseSitesServiceGetApiV1SitesDomainByDomainKeyFn = ({ domain, userId }: {
  domain: string;
  userId: string;
}, queryKey?: Array<unknown>) => [useSitesServiceGetApiV1SitesDomainByDomainKey, ...(queryKey ?? [{ domain, userId }])];
export type GoalsServiceGetApiV1GoalsSiteDomainByDomainDefaultResponse = Awaited<ReturnType<typeof GoalsService.getApiV1GoalsSiteDomainByDomain>>;
export type GoalsServiceGetApiV1GoalsSiteDomainByDomainQueryResult<TData = GoalsServiceGetApiV1GoalsSiteDomainByDomainDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGoalsServiceGetApiV1GoalsSiteDomainByDomainKey = "GoalsServiceGetApiV1GoalsSiteDomainByDomain";
export const UseGoalsServiceGetApiV1GoalsSiteDomainByDomainKeyFn = ({ domain, goalType, limit, skip, userId }: {
  domain: string;
  goalType?: string;
  limit?: number;
  skip?: number;
  userId: string;
}, queryKey?: Array<unknown>) => [useGoalsServiceGetApiV1GoalsSiteDomainByDomainKey, ...(queryKey ?? [{ domain, goalType, limit, skip, userId }])];
export type GoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameDefaultResponse = Awaited<ReturnType<typeof GoalsService.getApiV1GoalsSiteDomainByDomainGoalByName>>;
export type GoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameQueryResult<TData = GoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameKey = "GoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByName";
export const UseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameKeyFn = ({ domain, name, userId }: {
  domain: string;
  name: string;
  userId: string;
}, queryKey?: Array<unknown>) => [useGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameKey, ...(queryKey ?? [{ domain, name, userId }])];
export type SegmentsServiceGetApiV1SegmentsDefaultResponse = Awaited<ReturnType<typeof SegmentsService.getApiV1Segments>>;
export type SegmentsServiceGetApiV1SegmentsQueryResult<TData = SegmentsServiceGetApiV1SegmentsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSegmentsServiceGetApiV1SegmentsKey = "SegmentsServiceGetApiV1Segments";
export const UseSegmentsServiceGetApiV1SegmentsKeyFn = ({ dataType, domain, limit, skip, userId }: {
  dataType?: string;
  domain: string;
  limit?: number;
  skip?: number;
  userId: string;
}, queryKey?: Array<unknown>) => [useSegmentsServiceGetApiV1SegmentsKey, ...(queryKey ?? [{ dataType, domain, limit, skip, userId }])];
export type SegmentsServiceGetApiV1SegmentsByDomainByNameDefaultResponse = Awaited<ReturnType<typeof SegmentsService.getApiV1SegmentsByDomainByName>>;
export type SegmentsServiceGetApiV1SegmentsByDomainByNameQueryResult<TData = SegmentsServiceGetApiV1SegmentsByDomainByNameDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useSegmentsServiceGetApiV1SegmentsByDomainByNameKey = "SegmentsServiceGetApiV1SegmentsByDomainByName";
export const UseSegmentsServiceGetApiV1SegmentsByDomainByNameKeyFn = ({ domain, name, userId }: {
  domain: string;
  name: string;
  userId: string;
}, queryKey?: Array<unknown>) => [useSegmentsServiceGetApiV1SegmentsByDomainByNameKey, ...(queryKey ?? [{ domain, name, userId }])];
export type SitesServicePostApiV1SitesMutationResult = Awaited<ReturnType<typeof SitesService.postApiV1Sites>>;
export type GoalsServicePostApiV1GoalsSiteDomainByDomainMutationResult = Awaited<ReturnType<typeof GoalsService.postApiV1GoalsSiteDomainByDomain>>;
export type SegmentsServicePostApiV1SegmentsMutationResult = Awaited<ReturnType<typeof SegmentsService.postApiV1Segments>>;
export type AnalyticsServicePostApiV1AnalyticsSiteDomainGoalsStatsMutationResult = Awaited<ReturnType<typeof AnalyticsService.postApiV1AnalyticsSiteDomainGoalsStats>>;
export type AnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStatsMutationResult = Awaited<ReturnType<typeof AnalyticsService.postApiV1AnalyticsSiteDomainReferrerStats>>;
export type AnalyticsServicePostApiV1AnalyticsAnalyticsMutationResult = Awaited<ReturnType<typeof AnalyticsService.postApiV1AnalyticsAnalytics>>;
export type SitesServicePutApiV1SitesDomainByDomainMutationResult = Awaited<ReturnType<typeof SitesService.putApiV1SitesDomainByDomain>>;
export type GoalsServicePutApiV1GoalsSiteDomainByDomainGoalByNameMutationResult = Awaited<ReturnType<typeof GoalsService.putApiV1GoalsSiteDomainByDomainGoalByName>>;
export type SegmentsServicePutApiV1SegmentsByDomainByNameMutationResult = Awaited<ReturnType<typeof SegmentsService.putApiV1SegmentsByDomainByName>>;
export type SitesServiceDeleteApiV1SitesDomainByDomainMutationResult = Awaited<ReturnType<typeof SitesService.deleteApiV1SitesDomainByDomain>>;
export type GoalsServiceDeleteApiV1GoalsSiteDomainByDomainGoalByNameMutationResult = Awaited<ReturnType<typeof GoalsService.deleteApiV1GoalsSiteDomainByDomainGoalByName>>;
export type SegmentsServiceDeleteApiV1SegmentsByDomainByNameMutationResult = Awaited<ReturnType<typeof SegmentsService.deleteApiV1SegmentsByDomainByName>>;
