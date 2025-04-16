import { createFormHandler } from '@/common';
import { ResetPasswordRequestInput, resetPasswordRequestSchema } from '@/services/auth/schema';

const useResetPasswordForm = createFormHandler<ResetPasswordRequestInput>(
  { userEmail: '', captchaCode: null, captchaToken: null },
  resetPasswordRequestSchema,
);

export { useResetPasswordForm };
