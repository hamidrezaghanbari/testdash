import { useRouteLoaderData } from 'react-router-dom';

import { CaptchaResponse } from '@/services/auth/types';

const defaultCaptcha = {
  captchaEnabled: false,
  captchaToken: null,
  captchaImage: null,
} satisfies CaptchaResponse;

const useCheckCaptcha = () => {
  const data = useRouteLoaderData<CaptchaResponse>('login');

  return data ?? defaultCaptcha;
};

export { useCheckCaptcha };
