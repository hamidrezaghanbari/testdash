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
  defaultPushIcon: string;
  features: string[];
  id: number;
  isDemo: boolean;
  isMerchantBased: boolean;
  isSendify: boolean;
  name: string;
  restAuthType: string;
  restrictionConstraint: string;
  thirdPartyOption: string;
  throttlingEnabled: boolean;
  webPushConfigs: WebPushConfigs;
}

interface WebPushConfigs {
  managedByCustomer: boolean;
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

export type { UserResponse, UserResponseResult, Product };
