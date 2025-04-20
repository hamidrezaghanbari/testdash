import { useRouteLoaderData } from 'react-router-dom';

import { CaptchaResponse } from '@/services/auth/types';

const defaultCaptcha = {
  captchaEnabled: false,
  captchaToken: undefined,
  captchaImage: undefined,
} satisfies CaptchaResponse;

const useCheckCaptcha = () => {
  const data = useRouteLoaderData<CaptchaResponse>('login');

  return data ?? defaultCaptcha;
};

export { useCheckCaptcha };
