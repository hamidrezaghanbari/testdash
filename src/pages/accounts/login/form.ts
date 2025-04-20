import { createFormHandler } from '@/common';
import { LoginRequestInput, loginRequestSchema } from '@/services/auth/schema';

const useLoginForm = createFormHandler<LoginRequestInput>(
  { username: '', password: '', rememberMe: false, captchaCode: '' },
  loginRequestSchema.omit({ captchaToken: true }),
);

export { useLoginForm };
