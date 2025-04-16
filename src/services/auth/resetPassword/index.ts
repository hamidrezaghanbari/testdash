import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api/fetcher';
import { IntrackError, RequestOptions } from '@/services/helpers';

import {
  ResetPasswordRequestPayload,
  ResetPasswordResponse,
  resetPasswordRequestSchema,
} from './resetPassword.schema';

const resetPassword = async (payload: ResetPasswordRequestPayload): Promise<string> => {
  const data = await resetPasswordRequestSchema.parseAsync(payload);

  const { result } = await fetcher<ResetPasswordResponse>('/auth/profile/reset-password', {
    body: JSON.stringify(data),
    method: 'POST',
  });

  return result;
};

resetPassword.use = function (
  options?: RequestOptions<string, IntrackError, ResetPasswordRequestPayload>,
) {
  return useMutation<string, IntrackError, ResetPasswordRequestPayload>({
    mutationKey: ['/auth/profile/reset-password'],
    mutationFn: resetPassword,
    ...options,
  });
};

export { resetPassword };
