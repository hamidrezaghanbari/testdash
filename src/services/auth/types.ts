import { FetcherPath } from '@/api/getPath';

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

interface LoginResponse {
  result: LoginResponseResult;
  status: string;
}

interface RegisterResponseResult {
  email: string;
  emailVerified: boolean;
}

interface RegisterResponse {
  result: RegisterResponseResult;
  status: string;
}

interface ResetPasswordResponse {
  result: string;
  status: string;
}

interface UserResponseResult {
  email: string;
  emailVerified: boolean;
  enableTwoFactorAuthentication: boolean;
  lastProduct: number;
  lastReleaseNote: LastReleaseNote;
  login: boolean;
  otpId: string;
  presentation: string;
  products: Product[];
  roles: Role[];
  serverForcedTwoFactorAuthentication: boolean;
  userId: number;
}

interface LastReleaseNote {
  description: string;
  releaseDate: string;
  releaseNoteNumber: string;
}

interface Product {
  adsEnabled: boolean;
  apiCallEndpoints: string;
  dedicatedDomainUrl: string;
  defaultPushIcon?: string;
  features: string[];
  id: number;
  isDemo: boolean;
  isMerchantBased: boolean;
  isSendify: boolean;
  name: string;
  restAuthType: string;
  restrictionConstraint: string;
  thirdPartyOption: string;
  throttlingEnabled?: boolean;
  webPushConfigs: WebPushConfigs;
}

interface WebPushConfigs {
  managedByCustomer?: boolean;
  setupCompleted: boolean;
  webPushKeyType: string;
}

interface Role {
  permissions: string[];
  productId: number;
  productName: string;
}

interface UserResponse {
  result: UserResponseResult;
  status: string;
}

type ResendPasswordParams = FetcherPath<'/otp/resend/:otpId'>;

type CaptchaResponse = {
  captchaToken: string | null;
  captchaImage: string | null;
  captchaEnabled: boolean;
};

export type {
  Product,
  LoginResponse,
  RegisterResponse,
  CaptchaResponse,
  RegisterResponseResult,
  ResetPasswordResponse,
  LoginResponseResult,
  UserResponse,
  UserResponseResult,
  ResendPasswordParams,
};
