import { useApplicationStore } from '@/store';

import { type Endpoint } from './keys';

async function fetcher<R>(input: Endpoint, init?: RequestInit): Promise<R> {
  const headers = new Headers(init?.headers);

  headers.set('content-type', 'application/json');

  const { product } = useApplicationStore.getState();

  if (product && !input.startsWith('/auth')) {
    headers.set('product-id', product.id.toString());
  }

  const response = await fetch(BASE_URL + input, { ...init, credentials: 'include', headers });

  if (!response.ok) {
    throw await response.json();
  }

  return await response.json();
}

export { fetcher };
