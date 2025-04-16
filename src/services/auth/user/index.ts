import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api/fetcher';
import { IntrackError, RequestOptions } from '@/services/helpers';

import { UserResponse, UserResponseResult } from './user.schema';

const getCurrentUser = async (): Promise<UserResponseResult> => {
  const { result } = await fetcher<UserResponse>('/auth/authentication/currentUser', {
    method: 'POST',
  });

  return result;
};

getCurrentUser.use = function (options?: RequestOptions<UserResponseResult, IntrackError>) {
  return useMutation<UserResponseResult, IntrackError>({
    mutationKey: ['/auth/authentication/currentUser'],
    mutationFn: getCurrentUser,
    ...options,
  });
};

export { getCurrentUser };
