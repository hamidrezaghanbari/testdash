import { z } from 'zod';

import i18n from '@/i18n';

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

type LoginRequestPayload = z.infer<typeof loginRequestSchema>;

interface LoginResponseResult {
  login: boolean;
  userId: number;
  presentation: string;
  email: string;
  emailVerified: boolean;
  roles: Role[];
  products: Product[];
  lastProduct: number;
  enableTwoFactorAuthentication: boolean;
}

interface Role {
  productId?: number;
  productName?: string;
  permissions: string[];
}

interface Product {
  id: number;
  name: string;
  webPushConfigs: WebPushConfigs;
  defaultPushIcon?: string;
  features: string[];
  thirdPartyOption: string;
  restrictionConstraint: string;
  demo?: boolean;
  throttlingEnabled?: boolean;
}

interface WebPushConfigs {
  managedByCustomer?: boolean;
  webPushKeyType: string;
  setupCompleted: boolean;
}

interface LoginResponse {
  result: LoginResponseResult;
  status: string;
}

export { loginRequestSchema };
export type { LoginRequestPayload, LoginResponseResult, LoginResponse };
