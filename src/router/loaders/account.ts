import { replace } from 'react-router-dom';

import { getCurrentUser } from '@/services/auth';

const accountLoader = async () => {
  const user = await getCurrentUser();

  if (user && user.login) {
    throw replace('/');
  }
};

export { accountLoader };
