import { z } from 'zod';

import { createFormHandler } from '$/common';
import i18n from '$/i18n';

const schema = z.object({
  email: z
    .string()
    .nonempty({ message: i18n.t('login.requiredEmail') })
    .email({ message: i18n.t('login.validEmail') }),
  password: z.string().nonempty({ message: i18n.t('login.requiredPassword') }),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof schema>;

const useLoginForm = createFormHandler<LoginForm>(
  { email: '', password: '', remember: false },
  schema,
);

export type { LoginForm };

export { useLoginForm };
