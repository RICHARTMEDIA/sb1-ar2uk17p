import { z } from 'zod';

// Validation schemas
const emailSchema = z.string()
  .email('Invalid email format')
  .transform(email => email.toLowerCase().trim());

const passwordSchema = z.string()
  .min(6, 'Password must be at least 6 characters')
  .max(72, 'Password must not exceed 72 characters')
  .transform(pwd => pwd.trim());

export function validateEmail(email: string): boolean {
  const result = emailSchema.safeParse(email);
  return result.success;
}

export function validatePassword(password: string): boolean {
  const result = passwordSchema.safeParse(password);
  return result.success;
}

export function getValidationError(email: string, password: string): string | null {
  if (!email || !password) {
    return 'Email and password are required';
  }

  const emailResult = emailSchema.safeParse(email);
  if (!emailResult.success) {
    return emailResult.error.errors[0].message;
  }

  const passwordResult = passwordSchema.safeParse(password);
  if (!passwordResult.success) {
    return passwordResult.error.errors[0].message;
  }

  return null;
}

export function sanitizeCredentials(email: string, password: string) {
  return {
    email: email.toLowerCase().trim(),
    password: password.trim()
  };
}