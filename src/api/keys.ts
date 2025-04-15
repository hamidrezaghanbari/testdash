const endpoints = [
  '/auth/authentication/login',
  '/auth/authentication/logout',
  '/auth/authentication/register',
  '/auth/authentication/currentUser',
] as const;

type Endpoint = (typeof endpoints)[number];

export { endpoints };
export type { Endpoint };
