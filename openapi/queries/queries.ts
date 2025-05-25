// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AnalyticsService, GoalsService, SegmentsService, SitesService } from "../requests/services.gen";
import { GoalCreate, GoalStatsRequest, GoalUpdate, ReferrerStatsRequest, SegmentAnalyticsRequest, SegmentCreate, SegmentUpdate, SiteCreate, SiteUpdate } from "../requests/types.gen";
import * as Common from "./common";
export const useSitesServiceGetApiV1SitesUserByUserId = <TData = Common.SitesServiceGetApiV1SitesUserByUserIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, skip, userId }: {
  limit?: number;
  skip?: number;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseSitesServiceGetApiV1SitesUserByUserIdKeyFn({ limit, skip, userId }, queryKey), queryFn: () => SitesService.getApiV1SitesUserByUserId({ limit, skip, userId }) as TData, ...options });
export const useSitesServiceGetApiV1SitesDomainByDomain = <TData = Common.SitesServiceGetApiV1SitesDomainByDomainDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, userId }: {
  domain: string;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseSitesServiceGetApiV1SitesDomainByDomainKeyFn({ domain, userId }, queryKey), queryFn: () => SitesService.getApiV1SitesDomainByDomain({ domain, userId }) as TData, ...options });
export const useGoalsServiceGetApiV1GoalsSiteDomainByDomain = <TData = Common.GoalsServiceGetApiV1GoalsSiteDomainByDomainDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, goalType, limit, skip, userId }: {
  domain: string;
  goalType?: string;
  limit?: number;
  skip?: number;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainKeyFn({ domain, goalType, limit, skip, userId }, queryKey), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomain({ domain, goalType, limit, skip, userId }) as TData, ...options });
export const useGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByName = <TData = Common.GoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, name, userId }: {
  domain: string;
  name: string;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameKeyFn({ domain, name, userId }, queryKey), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomainGoalByName({ domain, name, userId }) as TData, ...options });
export const useSegmentsServiceGetApiV1Segments = <TData = Common.SegmentsServiceGetApiV1SegmentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ dataType, domain, limit, skip, userId }: {
  dataType?: string;
  domain: string;
  limit?: number;
  skip?: number;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsKeyFn({ dataType, domain, limit, skip, userId }, queryKey), queryFn: () => SegmentsService.getApiV1Segments({ dataType, domain, limit, skip, userId }) as TData, ...options });
export const useSegmentsServiceGetApiV1SegmentsByDomainByName = <TData = Common.SegmentsServiceGetApiV1SegmentsByDomainByNameDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, name, userId }: {
  domain: string;
  name: string;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsByDomainByNameKeyFn({ domain, name, userId }, queryKey), queryFn: () => SegmentsService.getApiV1SegmentsByDomainByName({ domain, name, userId }) as TData, ...options });
export const useSitesServicePostApiV1Sites = <TData = Common.SitesServicePostApiV1SitesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: SiteCreate;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: SiteCreate;
  userId: string;
}, TContext>({ mutationFn: ({ requestBody, userId }) => SitesService.postApiV1Sites({ requestBody, userId }) as unknown as Promise<TData>, ...options });
export const useGoalsServicePostApiV1GoalsSiteDomainByDomain = <TData = Common.GoalsServicePostApiV1GoalsSiteDomainByDomainMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  requestBody: GoalCreate;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  requestBody: GoalCreate;
  userId: string;
}, TContext>({ mutationFn: ({ domain, requestBody, userId }) => GoalsService.postApiV1GoalsSiteDomainByDomain({ domain, requestBody, userId }) as unknown as Promise<TData>, ...options });
export const useSegmentsServicePostApiV1Segments = <TData = Common.SegmentsServicePostApiV1SegmentsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: SegmentCreate;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: SegmentCreate;
  userId: string;
}, TContext>({ mutationFn: ({ requestBody, userId }) => SegmentsService.postApiV1Segments({ requestBody, userId }) as unknown as Promise<TData>, ...options });
export const useAnalyticsServicePostApiV1AnalyticsSiteDomainGoalsStats = <TData = Common.AnalyticsServicePostApiV1AnalyticsSiteDomainGoalsStatsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: GoalStatsRequest;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: GoalStatsRequest;
  userId: string;
}, TContext>({ mutationFn: ({ requestBody, userId }) => AnalyticsService.postApiV1AnalyticsSiteDomainGoalsStats({ requestBody, userId }) as unknown as Promise<TData>, ...options });
export const useAnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStats = <TData = Common.AnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStatsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ReferrerStatsRequest;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ReferrerStatsRequest;
  userId: string;
}, TContext>({ mutationFn: ({ requestBody, userId }) => AnalyticsService.postApiV1AnalyticsSiteDomainReferrerStats({ requestBody, userId }) as unknown as Promise<TData>, ...options });
export const useAnalyticsServicePostApiV1AnalyticsAnalytics = <TData = Common.AnalyticsServicePostApiV1AnalyticsAnalyticsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: SegmentAnalyticsRequest;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: SegmentAnalyticsRequest;
  userId: string;
}, TContext>({ mutationFn: ({ requestBody, userId }) => AnalyticsService.postApiV1AnalyticsAnalytics({ requestBody, userId }) as unknown as Promise<TData>, ...options });
export const useSitesServicePutApiV1SitesDomainByDomain = <TData = Common.SitesServicePutApiV1SitesDomainByDomainMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  requestBody: SiteUpdate;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  requestBody: SiteUpdate;
  userId: string;
}, TContext>({ mutationFn: ({ domain, requestBody, userId }) => SitesService.putApiV1SitesDomainByDomain({ domain, requestBody, userId }) as unknown as Promise<TData>, ...options });
export const useGoalsServicePutApiV1GoalsSiteDomainByDomainGoalByName = <TData = Common.GoalsServicePutApiV1GoalsSiteDomainByDomainGoalByNameMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  name: string;
  requestBody: GoalUpdate;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  name: string;
  requestBody: GoalUpdate;
  userId: string;
}, TContext>({ mutationFn: ({ domain, name, requestBody, userId }) => GoalsService.putApiV1GoalsSiteDomainByDomainGoalByName({ domain, name, requestBody, userId }) as unknown as Promise<TData>, ...options });
export const useSegmentsServicePutApiV1SegmentsByDomainByName = <TData = Common.SegmentsServicePutApiV1SegmentsByDomainByNameMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  name: string;
  requestBody: SegmentUpdate;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  name: string;
  requestBody: SegmentUpdate;
  userId: string;
}, TContext>({ mutationFn: ({ domain, name, requestBody, userId }) => SegmentsService.putApiV1SegmentsByDomainByName({ domain, name, requestBody, userId }) as unknown as Promise<TData>, ...options });
export const useSitesServiceDeleteApiV1SitesDomainByDomain = <TData = Common.SitesServiceDeleteApiV1SitesDomainByDomainMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  userId: string;
}, TContext>({ mutationFn: ({ domain, userId }) => SitesService.deleteApiV1SitesDomainByDomain({ domain, userId }) as unknown as Promise<TData>, ...options });
export const useGoalsServiceDeleteApiV1GoalsSiteDomainByDomainGoalByName = <TData = Common.GoalsServiceDeleteApiV1GoalsSiteDomainByDomainGoalByNameMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  name: string;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  name: string;
  userId: string;
}, TContext>({ mutationFn: ({ domain, name, userId }) => GoalsService.deleteApiV1GoalsSiteDomainByDomainGoalByName({ domain, name, userId }) as unknown as Promise<TData>, ...options });
export const useSegmentsServiceDeleteApiV1SegmentsByDomainByName = <TData = Common.SegmentsServiceDeleteApiV1SegmentsByDomainByNameMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  name: string;
  userId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  name: string;
  userId: string;
}, TContext>({ mutationFn: ({ domain, name, userId }) => SegmentsService.deleteApiV1SegmentsByDomainByName({ domain, name, userId }) as unknown as Promise<TData>, ...options });
