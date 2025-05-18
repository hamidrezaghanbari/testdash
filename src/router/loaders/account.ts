import { replace } from 'react-router-dom';

import { getCurrentUser } from '@/services/auth/handlers';

const accountLoader = async () => {
  // TEMPORARY: Disable authentication check for development
  return;

  /* Original authentication code (commented out temporarily)
  const user = await getCurrentUser();

  if (user && user.login) {
    throw replace('/');
  }
  */
};

export { accountLoader };
