import { z } from 'zod';

import { createFormHandler } from '$/common';
import i18n from '$/i18n';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: i18n.t('login.requiredEmail') })
    .email({ message: i18n.t('login.validEmail') }),
  password: z
    .string()
    .min(1, { message: i18n.t('login.requiredPassword') })
    .min(8, { message: i18n.t('login.passwordMinLength') }),
});

type LoginForm = z.infer<typeof schema>;

const useLoginForm = createFormHandler<LoginForm>({ email: '', password: '' }, schema);

export type { LoginForm };

export { useLoginForm };
