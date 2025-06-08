import { LoaderFunction, redirect, replace } from 'react-router-dom';

import { useDomainStore } from '@/store';

const domainGuardLoader: LoaderFunction = async ({ request }) => {
  const { domain } = useDomainStore.getState();

  if (!domain) {
    return replace('/products');
  }

  return null;
};

export { domainGuardLoader };
