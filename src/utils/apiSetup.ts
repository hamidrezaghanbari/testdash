/**
 * API setup utilities for configuring OpenAPI client interceptors
 */
import type { AxiosRequestConfig } from 'axios';

import { OpenAPI } from '@/openapi/requests';

/**
 * Get cookie value by name
 * @param name Cookie name
 * @returns Cookie value or undefined if not found
 */
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }

  return undefined;
}

/**
 * Test utility to verify cookie reading functionality
 * Call this in the browser console to test: window.testUserIdCookie()
 */
export function testUserIdCookie(): void {
  const userUuid = getCookie('userUuid');
  console.log('userUuid cookie value:', userUuid);

  if (userUuid) {
    console.log('✅ Cookie found and will be added as user-id header');
  } else {
    console.log('❌ No userUuid cookie found');
    console.log('Current cookies:', document.cookie);
  }
}

// Make test function available globally in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  (window as any).testUserIdCookie = testUserIdCookie;
}

/**
 * Setup API interceptors for the OpenAPI client
 * This adds the user-id header from the userUuid cookie to all requests
 */
export function setupApiInterceptors(): void {
  // Add request interceptor to include user-id header from cookie
  OpenAPI.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
    try {
      // const userUuid = getCookie('userUuid');
      const userUuid = '5b0d595e-a2b0-472e-8738-295eed652657';

      console.log(userUuid, 'ffff');

      if (userUuid) {
        // Ensure headers object exists
        if (!config.headers) {
          config.headers = {};
        }

        // Add user-id header with the value from userUuid cookie
        config.headers['user-id'] = userUuid;

        // Debug log in development
        if (process.env.NODE_ENV === 'development') {
          console.debug('[API Interceptor] Added user-id header:', userUuid);
        }
      } else if (process.env.NODE_ENV === 'development') {
        console.debug('[API Interceptor] No userUuid cookie found');
      }
    } catch (error) {
      // Log error but don't break the request
      console.error('[API Interceptor] Error adding user-id header:', error);
    }

    return config;
  });
}
