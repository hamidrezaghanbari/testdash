// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { GoalsService, SegmentsService, SitesService } from "../requests/services.gen";
import * as Common from "./common";
export const useSitesServiceGetApiV1SitesUserByUserIdSuspense = <TData = Common.SitesServiceGetApiV1SitesUserByUserIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, skip, userId }: {
  limit?: number;
  skip?: number;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseSitesServiceGetApiV1SitesUserByUserIdKeyFn({ limit, skip, userId }, queryKey), queryFn: () => SitesService.getApiV1SitesUserByUserId({ limit, skip, userId }) as TData, ...options });
export const useSitesServiceGetApiV1SitesDomainByDomainSuspense = <TData = Common.SitesServiceGetApiV1SitesDomainByDomainDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, userId }: {
  domain: string;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseSitesServiceGetApiV1SitesDomainByDomainKeyFn({ domain, userId }, queryKey), queryFn: () => SitesService.getApiV1SitesDomainByDomain({ domain, userId }) as TData, ...options });
export const useGoalsServiceGetApiV1GoalsSiteDomainByDomainSuspense = <TData = Common.GoalsServiceGetApiV1GoalsSiteDomainByDomainDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ category, domain, goalType, limit, skip, userId }: {
  category?: string;
  domain: string;
  goalType?: string;
  limit?: number;
  skip?: number;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainKeyFn({ category, domain, goalType, limit, skip, userId }, queryKey), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomain({ category, domain, goalType, limit, skip, userId }) as TData, ...options });
export const useGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameSuspense = <TData = Common.GoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, name, userId }: {
  domain: string;
  name: string;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameKeyFn({ domain, name, userId }, queryKey), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomainGoalByName({ domain, name, userId }) as TData, ...options });
export const useSegmentsServiceGetApiV1SegmentsSuspense = <TData = Common.SegmentsServiceGetApiV1SegmentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ dataType, domain, limit, skip, userId }: {
  dataType?: string;
  domain: string;
  limit?: number;
  skip?: number;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsKeyFn({ dataType, domain, limit, skip, userId }, queryKey), queryFn: () => SegmentsService.getApiV1Segments({ dataType, domain, limit, skip, userId }) as TData, ...options });
export const useSegmentsServiceGetApiV1SegmentsByDomainByNameSuspense = <TData = Common.SegmentsServiceGetApiV1SegmentsByDomainByNameDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, name, userId }: {
  domain: string;
  name: string;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsByDomainByNameKeyFn({ domain, name, userId }, queryKey), queryFn: () => SegmentsService.getApiV1SegmentsByDomainByName({ domain, name, userId }) as TData, ...options });
