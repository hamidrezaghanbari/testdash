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
export const useSitesServiceGetApiV1SitesDomainByDomain = <TData = Common.SitesServiceGetApiV1SitesDomainByDomainDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain }: {
  domain: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseSitesServiceGetApiV1SitesDomainByDomainKeyFn({ domain }, queryKey), queryFn: () => SitesService.getApiV1SitesDomainByDomain({ domain }) as TData, ...options });
export const useGoalsServiceGetApiV1GoalsSiteDomainByDomain = <TData = Common.GoalsServiceGetApiV1GoalsSiteDomainByDomainDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, goalType, limit, skip }: {
  domain: string;
  goalType?: string;
  limit?: number;
  skip?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainKeyFn({ domain, goalType, limit, skip }, queryKey), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomain({ domain, goalType, limit, skip }) as TData, ...options });
export const useGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByName = <TData = Common.GoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, name }: {
  domain: string;
  name: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameKeyFn({ domain, name }, queryKey), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomainGoalByName({ domain, name }) as TData, ...options });
export const useSegmentsServiceGetApiV1Segments = <TData = Common.SegmentsServiceGetApiV1SegmentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ dataType, domain, limit, skip }: {
  dataType?: string;
  domain: string;
  limit?: number;
  skip?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsKeyFn({ dataType, domain, limit, skip }, queryKey), queryFn: () => SegmentsService.getApiV1Segments({ dataType, domain, limit, skip }) as TData, ...options });
export const useSegmentsServiceGetApiV1SegmentsByDomainByName = <TData = Common.SegmentsServiceGetApiV1SegmentsByDomainByNameDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, name }: {
  domain: string;
  name: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsByDomainByNameKeyFn({ domain, name }, queryKey), queryFn: () => SegmentsService.getApiV1SegmentsByDomainByName({ domain, name }) as TData, ...options });
export const useSitesServicePostApiV1Sites = <TData = Common.SitesServicePostApiV1SitesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: SiteCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: SiteCreate;
}, TContext>({ mutationFn: ({ requestBody }) => SitesService.postApiV1Sites({ requestBody }) as unknown as Promise<TData>, ...options });
export const useGoalsServicePostApiV1GoalsSiteDomainByDomain = <TData = Common.GoalsServicePostApiV1GoalsSiteDomainByDomainMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  requestBody: GoalCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  requestBody: GoalCreate;
}, TContext>({ mutationFn: ({ domain, requestBody }) => GoalsService.postApiV1GoalsSiteDomainByDomain({ domain, requestBody }) as unknown as Promise<TData>, ...options });
export const useSegmentsServicePostApiV1Segments = <TData = Common.SegmentsServicePostApiV1SegmentsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: SegmentCreate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: SegmentCreate;
}, TContext>({ mutationFn: ({ requestBody }) => SegmentsService.postApiV1Segments({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAnalyticsServicePostApiV1AnalyticsSiteDomainGoalsStats = <TData = Common.AnalyticsServicePostApiV1AnalyticsSiteDomainGoalsStatsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: GoalStatsRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: GoalStatsRequest;
}, TContext>({ mutationFn: ({ requestBody }) => AnalyticsService.postApiV1AnalyticsSiteDomainGoalsStats({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStats = <TData = Common.AnalyticsServicePostApiV1AnalyticsSiteDomainReferrerStatsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ReferrerStatsRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ReferrerStatsRequest;
}, TContext>({ mutationFn: ({ requestBody }) => AnalyticsService.postApiV1AnalyticsSiteDomainReferrerStats({ requestBody }) as unknown as Promise<TData>, ...options });
export const useAnalyticsServicePostApiV1AnalyticsAnalytics = <TData = Common.AnalyticsServicePostApiV1AnalyticsAnalyticsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: SegmentAnalyticsRequest;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: SegmentAnalyticsRequest;
}, TContext>({ mutationFn: ({ requestBody }) => AnalyticsService.postApiV1AnalyticsAnalytics({ requestBody }) as unknown as Promise<TData>, ...options });
export const useSitesServicePutApiV1SitesDomainByDomain = <TData = Common.SitesServicePutApiV1SitesDomainByDomainMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  requestBody: SiteUpdate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  requestBody: SiteUpdate;
}, TContext>({ mutationFn: ({ domain, requestBody }) => SitesService.putApiV1SitesDomainByDomain({ domain, requestBody }) as unknown as Promise<TData>, ...options });
export const useGoalsServicePutApiV1GoalsSiteDomainByDomainGoalByName = <TData = Common.GoalsServicePutApiV1GoalsSiteDomainByDomainGoalByNameMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  name: string;
  requestBody: GoalUpdate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  name: string;
  requestBody: GoalUpdate;
}, TContext>({ mutationFn: ({ domain, name, requestBody }) => GoalsService.putApiV1GoalsSiteDomainByDomainGoalByName({ domain, name, requestBody }) as unknown as Promise<TData>, ...options });
export const useSegmentsServicePutApiV1SegmentsByDomainByName = <TData = Common.SegmentsServicePutApiV1SegmentsByDomainByNameMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  name: string;
  requestBody: SegmentUpdate;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  name: string;
  requestBody: SegmentUpdate;
}, TContext>({ mutationFn: ({ domain, name, requestBody }) => SegmentsService.putApiV1SegmentsByDomainByName({ domain, name, requestBody }) as unknown as Promise<TData>, ...options });
export const useSitesServiceDeleteApiV1SitesDomainByDomain = <TData = Common.SitesServiceDeleteApiV1SitesDomainByDomainMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
}, TContext>({ mutationFn: ({ domain }) => SitesService.deleteApiV1SitesDomainByDomain({ domain }) as unknown as Promise<TData>, ...options });
export const useGoalsServiceDeleteApiV1GoalsSiteDomainByDomainGoalByName = <TData = Common.GoalsServiceDeleteApiV1GoalsSiteDomainByDomainGoalByNameMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  name: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  name: string;
}, TContext>({ mutationFn: ({ domain, name }) => GoalsService.deleteApiV1GoalsSiteDomainByDomainGoalByName({ domain, name }) as unknown as Promise<TData>, ...options });
export const useSegmentsServiceDeleteApiV1SegmentsByDomainByName = <TData = Common.SegmentsServiceDeleteApiV1SegmentsByDomainByNameMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  domain: string;
  name: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  domain: string;
  name: string;
}, TContext>({ mutationFn: ({ domain, name }) => SegmentsService.deleteApiV1SegmentsByDomainByName({ domain, name }) as unknown as Promise<TData>, ...options });
