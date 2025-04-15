import { createFormHandler } from '@/common';
import { LoginRequestPayload, loginRequestSchema } from '@/services/auth/login/login.schema';

const useLoginForm = createFormHandler<LoginRequestPayload>(
  { username: '', password: '', rememberMe: false, captchaCode: null, captchaToken: null },
  loginRequestSchema,
);

export { useLoginForm };
