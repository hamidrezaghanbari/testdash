import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api/fetcher';
import { IntrackError, RequestOptions } from '@/services/helpers';

const logout = async (): Promise<void> => {
  return await fetcher('/auth/authentication/logout', {
    method: 'POST',
  });
};

logout.use = function (options?: RequestOptions<void, IntrackError>) {
  return useMutation({
    mutationKey: ['/auth/authentication/logout'],
    mutationFn: this,
    ...options,
  });
};

export { logout };
