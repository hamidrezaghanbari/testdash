import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api/fetcher';
import { IntrackError, RequestOptions } from '@/services/helpers';
import { useApplicationStore } from '@/store';

import { getCurrentUser } from '../user';
import {
  LoginRequestPayload,
  LoginResponse,
  LoginResponseResult,
  loginRequestSchema,
} from './login.schema';

const login = async (payload: LoginRequestPayload): Promise<LoginResponseResult> => {
  const data = await loginRequestSchema.parseAsync(payload);

  const { result } = await fetcher<LoginResponse>('/auth/authentication/login', {
    body: JSON.stringify(data),
    method: 'POST',
  });

  return result;
};

login.use = function (
  options?: RequestOptions<LoginResponseResult, IntrackError, LoginRequestPayload>,
) {
  return useMutation<LoginResponseResult, IntrackError, LoginRequestPayload>({
    mutationKey: ['/auth/authentication/login'],
    mutationFn: login,
    ...options,
  });
};

login.onSuccess = async function (navigateCallback: () => void) {
  const user = await getCurrentUser();
  if (user && user.login) {
    const { updateUser } = useApplicationStore.getState();

    updateUser(user);
    navigateCallback();
  }
};

export { login };
