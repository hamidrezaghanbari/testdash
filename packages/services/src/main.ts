import { useMutation, useQuery } from '@tanstack/react-query';

type TransformEndpoint<T extends string[]> = T extends [
  infer R extends string,
  ...infer Rest extends string[],
]
  ? `/${R}${Rest['length'] extends 0 ? '' : TransformEndpoint<Rest>}`
  : '';

interface ServiceBuilderOptions<Endpoint extends string> {
  endpoint: Endpoint;
}

const BASE_URL = 'http://localhost:8000';

type RequestData = {
  queryParams?: Record<string, string>;
};

function createUseQuery<Endpoint extends string[], Response>({
  endpoint,
}: ServiceBuilderOptions<TransformEndpoint<Endpoint>>) {
  return (requestData?: RequestData) => {
    const { data, error, isLoading } = useQuery<[Endpoint, RequestData], Error, Response>({
      queryKey: [endpoint, requestData],
      queryFn: async ({ signal }) => {
        const response = await fetch(BASE_URL + endpoint, {
          method: 'GET',
          signal,
        });

        if (!response.ok) throw new Error('error');

        const data = await response.json();

        return data;
      },
    });

    return { data, error, isLoading };
  };
}

type MutationCallbacks<Request, Response = void> = {
  onSuccess?: (data: Response, payload: Request) => Promise<void>;
  onError?: (error: Error, payload: Request) => Promise<void>;
  onSettled?: (data: Response | undefined, error: Error | null, payload: Request) => void;
};

function createUseMutation<Endpoint extends string[], Request, Response = void>({
  endpoint,
}: ServiceBuilderOptions<TransformEndpoint<Endpoint>>) {
  return (callbacks: MutationCallbacks<Request, Response>, requestData?: RequestData) => {
    const { mutate, data, error, isPending } = useMutation<Response, Error, Request>({
      mutationKey: [endpoint],
      mutationFn: async (payload) => {
        const response = await fetch(BASE_URL + endpoint, {
          method: 'POST',
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(await response.json());

        const data = await response.json();

        return data;
      },
      onSuccess(data, payload) {
        if (callbacks.onSuccess) callbacks.onSuccess(data, payload);
      },
      onError(error, payload) {
        if (callbacks.onError) callbacks.onError(error, payload);
      },
      onSettled(data, error, payload) {
        if (callbacks.onSettled) callbacks.onSettled(data, error, payload);
      },
      scope: { id: endpoint },
    });

    return { mutate, data, error, isLoading: isPending };
  };
}

export { createUseQuery, createUseMutation };
