import { replace } from 'react-router-dom';

import { currentUser } from '@/services/auth';

const accountLoader = async () => {
  const result = await currentUser();

  if (result && result.login) {
    throw replace('/');
  }
};

export { accountLoader };
