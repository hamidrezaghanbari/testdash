import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/api/fetcher';
import { FetcherPath, getPath } from '@/api/getPath';
import { IntrackError, RequestOptions } from '@/services/helpers';

type ResendPasswordParams = FetcherPath<'/otp/resend/:otpId'>;

const resendPassword = async ({ otpId }: ResendPasswordParams): Promise<void> => {
  return await fetcher(getPath('/otp/resend/:otpId', { otpId }), {
    method: 'POST',
  });
};

resendPassword.use = function (options?: RequestOptions<void, IntrackError, ResendPasswordParams>) {
  return useMutation<void, IntrackError, ResendPasswordParams>({
    mutationKey: ['/otp/resend/:otpId'],
    mutationFn: resendPassword,
    ...options,
  });
};

export { resendPassword };
