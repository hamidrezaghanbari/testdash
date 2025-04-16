import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api/fetcher';
import { IntrackError, RequestOptions } from '@/services/helpers';

import { ChangePasswordRequestPayload, changePasswordRequestSchema } from './changePassword.schema';

const changePassword = async (payload: ChangePasswordRequestPayload): Promise<void> => {
  const data = await changePasswordRequestSchema.parseAsync(payload);

  await fetcher('/auth/profile/reset-password-submit', {
    body: JSON.stringify(data),
    method: 'POST',
  });
};

changePassword.use = function (
  options?: RequestOptions<void, IntrackError, ChangePasswordRequestPayload>,
) {
  return useMutation<void, IntrackError, ChangePasswordRequestPayload>({
    mutationKey: ['/auth/profile/reset-password-submit'],
    mutationFn: changePassword,
    ...options,
  });
};

export { changePassword };
