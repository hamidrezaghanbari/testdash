import { useApplicationStore } from '@/store';

import { type Endpoint } from './keys';

function setProductHeader(input: Endpoint, headers: Headers) {
  const { product } = useApplicationStore.getState();

  const isPrivateRoute = !input.startsWith('/auth');

  if (product && isPrivateRoute) {
    headers.set('product-id', String(product.id));
  }
}

async function fetcher<R>(input: Endpoint, init?: RequestInit): Promise<R> {
  const headers = new Headers(init?.headers);

  headers.set('content-type', 'application/json');

  setProductHeader(input, headers);

  const response = await fetch(BASE_URL + input, { ...init, credentials: 'include', headers });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
}

export { fetcher };
