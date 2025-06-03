import { LoaderFunction, redirect } from 'react-router-dom';

import { useDomainStore } from '@/store';

const domainGuardLoader: LoaderFunction = async ({ request }) => {
  // const { domain } = useDomainStore.getState();
  // const url = new URL(request.url);

  // If no domain is set and user is not trying to access products page, redirect to products
  // if (!domain && !url.pathname.startsWith('/products')) {
  //   throw redirect('/events');
  // }

  return null;
};

export { domainGuardLoader };
