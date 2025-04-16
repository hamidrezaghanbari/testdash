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

const loginRequestSchema = z.object({
  username: z
    .string()
    .nonempty({ message: i18n.t('login.requiredEmail') })
    .email({ message: i18n.t('login.validEmail') }),
  password: z.string().nonempty({ message: i18n.t('login.requiredPassword') }),
  rememberMe: z.boolean().optional(),
  captchaCode: z.string().nullable(),
  captchaToken: z.string().nullable(),
});

const registerRequestSchema = z.object({
  firstName: z.string().nonempty({ message: i18n.t('register.requiredFirstname') }),
  lastName: z.string().nonempty({ message: i18n.t('register.requiredLastname') }),
  inputPassword: z.string().nonempty({ message: i18n.t('register.requiredPassword') }),
  phone: z
    .string()
    .nonempty({ message: i18n.t('register.requiredPhoneNumber') })
    .refine((phone) => /^(?:98|0)9\d{9}/.test(phone), {
      message: i18n.t('register.invalidPhoneNumber'),
    }),
});

const resetPasswordRequestSchema = z.object({
  userEmail: z
    .string()
    .nonempty({ message: i18n.t('resetPassword.requiredEmail') })
    .email({ message: i18n.t('resetPassword.validEmail') }),
  captchaCode: z.string().nullable(),
  captchaToken: z.string().nullable(),
});

type ResetPasswordRequestPayload = z.infer<typeof resetPasswordRequestSchema>;
type RegisterRequestPayload = z.infer<typeof registerRequestSchema>;
type ChangePasswordRequestPayload = z.infer<typeof changePasswordRequestSchema>;
type LoginRequestPayload = z.infer<typeof loginRequestSchema>;

export {
  changePasswordRequestSchema,
  registerRequestSchema,
  loginRequestSchema,
  resetPasswordRequestSchema,
};
export type {
  ChangePasswordRequestPayload,
  RegisterRequestPayload,
  ResetPasswordRequestPayload,
  LoginRequestPayload,
};
