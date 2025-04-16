import { z } from 'zod';

import i18n from '@/i18n';

const resetPasswordRequestSchema = z.object({
  userEmail: z
    .string()
    .nonempty({ message: i18n.t('resetPassword.requiredEmail') })
    .email({ message: i18n.t('resetPassword.validEmail') }),
  captchaCode: z.string().nullable(),
  captchaToken: z.string().nullable(),
});

type ResetPasswordRequestPayload = z.infer<typeof resetPasswordRequestSchema>;

interface ResetPasswordResponse {
  result: string;
  status: string;
}

export { resetPasswordRequestSchema };
export type { ResetPasswordRequestPayload, ResetPasswordResponse };
