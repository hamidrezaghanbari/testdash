import { LoaderFunction, redirect } from 'react-router-dom';

import { useDomainStore } from '@/store';

const protectedRouteLoader: LoaderFunction = async ({ request }) => {
  const { domain } = useDomainStore.getState();
  const url = new URL(request.url);

  // If no domain is set and user is not trying to access products page, redirect to products
  if (!domain && !url.pathname.startsWith('/products')) {
    throw redirect('/products');
  }

  // TEMPORARY: Disable authentication check for development
  return null;

  /* Original authentication code (commented out temporarily)
  const user = await getCurrentUser();

  if (user && user.login) {
    throw redirect('/');
  }
  */
};

export { protectedRouteLoader };
