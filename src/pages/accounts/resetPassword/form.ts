import { z } from 'zod';

import { createFormHandler } from '@/common';
import i18n from '@/i18n';

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: i18n.t('resetPassword.requiredEmail') })
    .email({ message: i18n.t('resetPassword.validEmail') }),
});

type ResetPasswordForm = z.infer<typeof schema>;

const useResetPasswordForm = createFormHandler<ResetPasswordForm>({ email: '' }, schema);

export type { ResetPasswordForm };

export { useResetPasswordForm };
