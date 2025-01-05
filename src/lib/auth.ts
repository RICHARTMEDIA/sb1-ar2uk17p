import { AuthError, AuthApiError } from '@supabase/supabase-js';

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AuthApiError) {
    switch (error.status) {
      case 400:
        if (error.message.includes('Invalid login credentials')) {
          return 'Invalid email or password';
        }
        return 'Invalid login attempt';
      case 422:
        return 'Invalid email format';
      case 429:
        return 'Too many login attempts. Please try again later';
      default:
        return 'Authentication failed';
    }
  }
  
  if (error instanceof AuthError) {
    return 'Authentication service unavailable';
  }

  return 'An unexpected error occurred';
}