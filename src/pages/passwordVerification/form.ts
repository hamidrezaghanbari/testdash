import { z } from 'zod';

import { createFormHandler } from '$/common';
import i18n from '$/i18n';

const schema = z
  .object({
    code: z
      .string()
      .nonempty({ message: i18n.t('passwordVerification.requiredCode') })
      .length(6, { message: i18n.t('passwordVerification.invalidCode') }),
    password: z.string().nonempty({ message: i18n.t('passwordVerification.password') }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: i18n.t('passwordVerification.passwordsMatched'),
    path: ['confirmPassword'],
  });

type PasswordVerificationForm = z.infer<typeof schema>;

const usePasswordVerificationForm = createFormHandler<PasswordVerificationForm>(
  { code: '', password: '', confirmPassword: '' },
  schema,
);

export type { PasswordVerificationForm };

export { usePasswordVerificationForm };
