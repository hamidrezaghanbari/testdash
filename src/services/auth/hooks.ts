import { useMutation } from '@tanstack/react-query';

import { IntrackError, RequestOptions } from '../helpers';
import * as handlers from './handlers';
import {
  ChangePasswordRequestInput,
  LoginRequestInput,
  RegisterRequestInput,
  ResetPasswordRequestInput,
} from './schema';
import {
  LoginResponseResult,
  RegisterResponseResult,
  ResendPasswordParams,
  UserResponseResult,
} from './types';

export function useChangePassword(
  options?: RequestOptions<void, IntrackError, ChangePasswordRequestInput>,
) {
  return useMutation<void, IntrackError, ChangePasswordRequestInput>({
    mutationKey: ['/auth/profile/reset-password-submit'],
    mutationFn: handlers.changePassword,
    ...options,
  });
}

export function useLogin(
  options?: RequestOptions<LoginResponseResult, IntrackError, LoginRequestInput>,
) {
  return useMutation<LoginResponseResult, IntrackError, LoginRequestInput>({
    mutationKey: ['/auth/authentication/login'],
    mutationFn: handlers.login,
    ...options,
  });
}

export function useLogout(options?: RequestOptions<void, IntrackError>) {
  return useMutation({
    mutationKey: ['/auth/authentication/logout'],
    mutationFn: handlers.logout,
    ...options,
  });
}

export function useRegister(
  token: string | null,
  options?: RequestOptions<RegisterResponseResult, IntrackError, RegisterRequestInput>,
) {
  return useMutation<RegisterResponseResult, IntrackError, RegisterRequestInput>({
    mutationKey: ['/auth/authentication/register', token],
    mutationFn: (args) => handlers.register(token, args),
    ...options,
  });
}

export function useResendPassword(
  options?: RequestOptions<void, IntrackError, ResendPasswordParams>,
) {
  return useMutation<void, IntrackError, ResendPasswordParams>({
    mutationKey: ['/otp/resend/:otpId'],
    mutationFn: handlers.resendPassword,
    ...options,
  });
}

export function useResetPassword(
  options?: RequestOptions<string, IntrackError, ResetPasswordRequestInput>,
) {
  return useMutation<string, IntrackError, ResetPasswordRequestInput>({
    mutationKey: ['/auth/profile/reset-password'],
    mutationFn: handlers.resetPassword,
    ...options,
  });
}

export function useGetCurrentUser(options?: RequestOptions<UserResponseResult, IntrackError>) {
  return useMutation<UserResponseResult, IntrackError>({
    mutationKey: ['/auth/authentication/currentUser'],
    mutationFn: handlers.getCurrentUser,
    ...options,
  });
}
