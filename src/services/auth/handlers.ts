import { fetcher } from '@/api/fetcher';
import { getPath } from '@/api/getPath';
import { setSearchParams } from '@/api/setSearchParams';

import {
  ChangePasswordRequestPayload,
  LoginRequestPayload,
  RegisterRequestPayload,
  ResetPasswordRequestPayload,
  changePasswordRequestSchema,
  loginRequestSchema,
  registerRequestSchema,
  resetPasswordRequestSchema,
} from './schema';
import {
  LoginResponse,
  LoginResponseResult,
  RegisterResponse,
  RegisterResponseResult,
  ResendPasswordParams,
  ResetPasswordResponse,
  UserResponse,
  UserResponseResult,
} from './types';

export const changePassword = async (payload: ChangePasswordRequestPayload): Promise<void> => {
  const data = await changePasswordRequestSchema.parseAsync(payload);

  await fetcher('/auth/profile/reset-password-submit', {
    body: JSON.stringify(data),
    method: 'POST',
  });
};

export const login = async (payload: LoginRequestPayload): Promise<LoginResponseResult> => {
  const data = await loginRequestSchema.parseAsync(payload);

  const { result } = await fetcher<LoginResponse>('/auth/authentication/login', {
    body: JSON.stringify(data),
    method: 'POST',
  });

  return result;
};

export const logout = async (): Promise<void> => {
  return await fetcher('/auth/authentication/logout', {
    method: 'POST',
  });
};

export const register = async (
  token: string | null,
  payload: RegisterRequestPayload,
): Promise<RegisterResponseResult> => {
  const data = await registerRequestSchema.parseAsync(payload);

  if (!token) throw new Error('Token is undefined');

  const url = setSearchParams('/auth/authentication/register', { token });

  const { result } = await fetcher<RegisterResponse>(url, {
    body: JSON.stringify(data),
    method: 'POST',
  });

  return result;
};

export const resendPassword = async ({ otpId }: ResendPasswordParams): Promise<void> => {
  return await fetcher(getPath('/otp/resend/:otpId', { otpId }), {
    method: 'POST',
  });
};

export const resetPassword = async (payload: ResetPasswordRequestPayload): Promise<string> => {
  const data = await resetPasswordRequestSchema.parseAsync(payload);

  const { result } = await fetcher<ResetPasswordResponse>('/auth/profile/reset-password', {
    body: JSON.stringify(data),
    method: 'POST',
  });

  return result;
};

export const getCurrentUser = async (): Promise<UserResponseResult> => {
  const { result } = await fetcher<UserResponse>('/auth/authentication/currentUser', {
    method: 'POST',
  });

  return result;
};
