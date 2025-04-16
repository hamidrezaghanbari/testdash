const endpoints = [
  '/auth/authentication/login',
  '/auth/authentication/logout',
  '/auth/authentication/register',
  '/auth/authentication/currentUser',
  '/auth/authentication/register',
  '/auth/authentication/captcha',
  '/auth/profile/reset-password',
  '/auth/profile/reset-password-submit',
  '/otp/resend/:otpId',
] as const;

type Endpoint = (typeof endpoints)[number];

export { endpoints };
export type { Endpoint };
