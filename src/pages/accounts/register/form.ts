import { z } from 'zod';

import { createFormHandler } from '$/common';
import i18n from '$/i18n';

const schema = z.object({
  firstName: z.string().nonempty({ message: i18n.t('register.requiredFirstname') }),
  lastName: z.string().nonempty({ message: i18n.t('register.requiredLastname') }),
  password: z.string().nonempty({ message: i18n.t('register.requiredPassword') }),
  phoneNumber: z
    .string()
    .nonempty({ message: i18n.t('register.requiredPhoneNumber') })
    .refine((phone) => /^(?:98|0)9\d{9}$/.test(phone), {
      message: i18n.t('register.invalidPhoneNumber'),
    }),
});

type RegisterForm = z.infer<typeof schema>;

const useRegisterForm = createFormHandler<RegisterForm>(
  { firstName: '', lastName: '', phoneNumber: '', password: '' },
  schema,
);

export type { RegisterForm };

export { useRegisterForm };
