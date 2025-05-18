// generated with @7nohe/openapi-react-query-codegen@1.6.2 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { GoalsService, SegmentsService, SitesService } from "../requests/services.gen";
import * as Common from "./common";
export const useSitesServiceGetApiV1SitesUserByUserIdSuspense = <TData = Common.SitesServiceGetApiV1SitesUserByUserIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ limit, skip, userId }: {
  limit?: number;
  skip?: number;
  userId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseSitesServiceGetApiV1SitesUserByUserIdKeyFn({ limit, skip, userId }, queryKey), queryFn: () => SitesService.getApiV1SitesUserByUserId({ limit, skip, userId }) as TData, ...options });
export const useSitesServiceGetApiV1SitesDomainByDomainSuspense = <TData = Common.SitesServiceGetApiV1SitesDomainByDomainDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain }: {
  domain: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseSitesServiceGetApiV1SitesDomainByDomainKeyFn({ domain }, queryKey), queryFn: () => SitesService.getApiV1SitesDomainByDomain({ domain }) as TData, ...options });
export const useGoalsServiceGetApiV1GoalsSiteDomainByDomainSuspense = <TData = Common.GoalsServiceGetApiV1GoalsSiteDomainByDomainDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, goalType, limit, skip }: {
  domain: string;
  goalType?: string;
  limit?: number;
  skip?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainKeyFn({ domain, goalType, limit, skip }, queryKey), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomain({ domain, goalType, limit, skip }) as TData, ...options });
export const useGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameSuspense = <TData = Common.GoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, name }: {
  domain: string;
  name: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGoalsServiceGetApiV1GoalsSiteDomainByDomainGoalByNameKeyFn({ domain, name }, queryKey), queryFn: () => GoalsService.getApiV1GoalsSiteDomainByDomainGoalByName({ domain, name }) as TData, ...options });
export const useSegmentsServiceGetApiV1SegmentsSuspense = <TData = Common.SegmentsServiceGetApiV1SegmentsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ dataType, domain, limit, skip }: {
  dataType?: string;
  domain: string;
  limit?: number;
  skip?: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsKeyFn({ dataType, domain, limit, skip }, queryKey), queryFn: () => SegmentsService.getApiV1Segments({ dataType, domain, limit, skip }) as TData, ...options });
export const useSegmentsServiceGetApiV1SegmentsByDomainByNameSuspense = <TData = Common.SegmentsServiceGetApiV1SegmentsByDomainByNameDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ domain, name }: {
  domain: string;
  name: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseSegmentsServiceGetApiV1SegmentsByDomainByNameKeyFn({ domain, name }, queryKey), queryFn: () => SegmentsService.getApiV1SegmentsByDomainByName({ domain, name }) as TData, ...options });
