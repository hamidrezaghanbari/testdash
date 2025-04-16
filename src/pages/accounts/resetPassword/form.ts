import { createFormHandler } from '@/common';
import { ResetPasswordRequestPayload, resetPasswordRequestSchema } from '@/services/auth/schema';

const useResetPasswordForm = createFormHandler<ResetPasswordRequestPayload>(
  { userEmail: '', captchaCode: null, captchaToken: null },
  resetPasswordRequestSchema,
);

export { useResetPasswordForm };
