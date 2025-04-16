import { getCaptcha } from '@/services/auth/handlers';
import { CaptchaResponse } from '@/services/auth/types';

const defaultCaptcha = {
  captchaToken: null,
  captchaEnabled: false,
  captchaImage: null,
} satisfies CaptchaResponse;

const captchaLoader = async () => {
  try {
    return await getCaptcha();
  } catch (error) {
    return defaultCaptcha;
  }
};

export { captchaLoader };
