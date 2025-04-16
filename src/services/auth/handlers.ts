import { fetcher, getFile } from '@/api/fetcher';
import { getPath } from '@/api/getPath';
import { setSearchParams } from '@/api/setSearchParams';

import {
  ChangePasswordRequestInput,
  LoginRequestInput,
  RegisterRequestInput,
  ResetPasswordRequestInput,
  changePasswordRequestSchema,
  loginRequestSchema,
  registerRequestSchema,
  resetPasswordRequestSchema,
} from './schema';
import {
  CaptchaResponse,
  LoginResponse,
  LoginResponseResult,
  RegisterResponse,
  RegisterResponseResult,
  ResendPasswordParams,
  ResetPasswordResponse,
  UserResponse,
  UserResponseResult,
} from './types';

export const changePassword = async (input: ChangePasswordRequestInput): Promise<void> => {
  const payload = await changePasswordRequestSchema.parseAsync(input);

  await fetcher('/auth/profile/reset-password-submit', {
    body: JSON.stringify(payload),
    method: 'POST',
  });
};

export const login = async (input: LoginRequestInput): Promise<LoginResponseResult> => {
  const payload = await loginRequestSchema.parseAsync(input);

  const { data } = await fetcher<LoginResponse>('/auth/authentication/login', {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  return data.result;
};

export const logout = async (): Promise<void> => {
  await fetcher('/auth/authentication/logout', {
    method: 'POST',
  });
};

export const register = async (
  token: string | null,
  input: RegisterRequestInput,
): Promise<RegisterResponseResult> => {
  const payload = await registerRequestSchema.parseAsync(input);

  if (!token) throw new Error('Token is undefined');

  const url = setSearchParams('/auth/authentication/register', { token });

  const { data } = await fetcher<RegisterResponse>(url, {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  return data.result;
};

export const resendPassword = async ({ otpId }: ResendPasswordParams): Promise<void> => {
  await fetcher(getPath('/otp/resend/:otpId', { otpId }), {
    method: 'POST',
  });
};

export const resetPassword = async (input: ResetPasswordRequestInput): Promise<string> => {
  const payload = await resetPasswordRequestSchema.parseAsync(input);

  const { data } = await fetcher<ResetPasswordResponse>('/auth/profile/reset-password', {
    body: JSON.stringify(payload),
    method: 'POST',
  });

  return data.result;
};

export const getCurrentUser = async (): Promise<UserResponseResult> => {
  const { data } = await fetcher<UserResponse>('/auth/authentication/currentUser', {
    method: 'POST',
  });

  return data.result;
};

export const getCaptcha = async (): Promise<CaptchaResponse> => {
  const { data, headers } = await getFile('/auth/authentication/captcha', { method: 'POST' });

  const captchaEnabled = headers.get('captcha-enabled') === 'true';
  const captchaToken = headers.get('captcha-token') || null;

  return { captchaEnabled, captchaToken, captchaImage: data };
};
