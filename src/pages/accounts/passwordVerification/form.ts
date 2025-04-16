import { z } from 'zod';

import { createFormHandler } from '@/common';
import i18n from '@/i18n';
import { changePasswordRequestSchema } from '@/services/auth/schema';

const passwordVerificationSchema = changePasswordRequestSchema
  .pick({ otpCode: true, newPassword: true })
  .merge(z.object({ confirmPassword: z.string() }))
  .refine(({ newPassword, confirmPassword }) => newPassword === confirmPassword, {
    message: i18n.t('passwordVerification.passwordsMatched'),
    path: ['confirmPassword'],
  });

type PasswordVerificationPayload = z.infer<typeof passwordVerificationSchema>;

const usePasswordVerificationForm = createFormHandler<PasswordVerificationPayload>(
  { otpCode: '', newPassword: '', confirmPassword: '' },
  passwordVerificationSchema,
);

export { usePasswordVerificationForm };
export type { PasswordVerificationPayload };
