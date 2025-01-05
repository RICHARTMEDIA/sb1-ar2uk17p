import { AuthError, AuthApiError } from '@supabase/supabase-js';

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  INVALID_EMAIL: 'Invalid email format',
  RATE_LIMIT: 'Too many login attempts. Please try again later',
  SERVICE_UNAVAILABLE: 'Authentication service unavailable',
  UNEXPECTED: 'An unexpected error occurred',
  NO_USER_DATA: 'No user data received',
  NOT_CONFIGURED: 'Authentication is not configured properly'
} as const;

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AuthApiError) {
    switch (error.status) {
      case 400:
        if (error.message.includes('Invalid login credentials')) {
          return AUTH_ERRORS.INVALID_CREDENTIALS;
        }
        return AUTH_ERRORS.UNEXPECTED;
      case 422:
        return AUTH_ERRORS.INVALID_EMAIL;
      case 429:
        return AUTH_ERRORS.RATE_LIMIT;
      default:
        return AUTH_ERRORS.UNEXPECTED;
    }
  }
  
  if (error instanceof AuthError) {
    return AUTH_ERRORS.SERVICE_UNAVAILABLE;
  }

  return AUTH_ERRORS.UNEXPECTED;
}