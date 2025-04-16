import { z } from 'zod';

import i18n from '@/i18n';

const changePasswordRequestSchema = z.object({
  otpCode: z
    .string()
    .nonempty({ message: i18n.t('passwordVerification.requiredCode') })
    .length(6, { message: i18n.t('passwordVerification.invalidCode') })
    .refine((code) => /\d{6}/.test(code), {
      message: i18n.t('passwordVerification.invalidCode'),
    }),
  newPassword: z.string().nonempty({ message: i18n.t('passwordVerification.password') }),
  userEmail: z.string().email(),
  otpId: z.string(),
});

type ChangePasswordRequestPayload = z.infer<typeof changePasswordRequestSchema>;

export { changePasswordRequestSchema };
export type { ChangePasswordRequestPayload };
