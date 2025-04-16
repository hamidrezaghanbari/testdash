import { useApplicationStore } from '@/store';

import { type Endpoint } from './keys';

type FetcherReturn<R> = {
  data: R;
  headers: Headers;
};

function setProductHeader(input: Endpoint, headers: Headers) {
  const { product } = useApplicationStore.getState();

  const isPrivateRoute = !input.startsWith('/auth');

  if (product && isPrivateRoute) {
    headers.set('product-id', String(product.id));
  }
}

async function send(clone: Response, blob = false) {
  try {
    if (blob) {
      const file = await clone.blob();

      if (!file) return null;

      return URL.createObjectURL(file);
    }
    return await clone.json();
  } catch (error) {
    if (clone.bodyUsed) return 'Internal Server Exception';
    return await clone.text();
  }
}

async function fetcher<R = void>(input: Endpoint, init?: RequestInit): Promise<FetcherReturn<R>> {
  const headers = new Headers(init?.headers);

  headers.set('content-type', 'application/json');

  setProductHeader(input, headers);

  const response = await fetch(BASE_URL + input, { ...init, credentials: 'include', headers });

  const clone = response.clone();

  if (!response.ok) throw await send(clone);

  const data = await send(clone);

  return { data, headers: clone.headers };
}

async function getFile(input: Endpoint, init?: RequestInit): Promise<FetcherReturn<string | null>> {
  const headers = new Headers(init?.headers);

  headers.set('content-type', 'application/json');

  setProductHeader(input, headers);

  const response = await fetch(BASE_URL + input, { ...init, credentials: 'include', headers });

  const clone = response.clone();

  if (!response.ok) throw await send(clone);

  const data = await send(clone, true);

  return { data, headers: clone.headers };
}

export { fetcher, getFile };
