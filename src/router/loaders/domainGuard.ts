import { LoaderFunction, redirect, replace } from 'react-router-dom';

import { useDomainStore } from '@/store';

const domainGuardLoader: LoaderFunction = async ({ request }) => {
  const { domain } = useDomainStore.getState();

  console.log({ domain }, 'fuck here');

  if (!domain) {
    return replace('/products');
  }
  // const url = new URL(request.url);

  // If no domain is set and user is not trying to access products page, redirect to products
  // if (!domain && !url.pathname.startsWith('/products')) {
  //   throw redirect('/events');
  // }

  return null;
};

export { domainGuardLoader };
