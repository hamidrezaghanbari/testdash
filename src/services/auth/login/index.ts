import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api/fetcher';
import { CONSTANTS } from '@/constants';
import { IntrackError, RequestOptions } from '@/services/helpers';
import { useApplicationStore } from '@/store';

import { currentUser } from '../user';
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
    mutationFn: this,
    ...options,
  });
};

login.onSuccess = async function (navigateCallback: () => void) {
  const user = await currentUser();
  if (user && user.login) {
    sessionStorage.setItem(CONSTANTS.USER, JSON.stringify(user));
    useApplicationStore.setState((state) => ({ ...state, user }));
    navigateCallback();
  }
};

export { login };
