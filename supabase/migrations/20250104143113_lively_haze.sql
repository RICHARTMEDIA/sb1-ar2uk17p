/*
  # Add admin user

  1. Changes
    - Insert admin user with provided UID into auth.users table
    - Set admin user's email and hashed password
*/

-- Insert admin user with the provided UID
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change_token_current,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'de0d1a3b-a9d1-4eab-8be4-da0eb7603e26',
  'authenticated',
  'authenticated',
  'admin@example.com',
  '$2a$10$Q8PeKFopaGiTR0kDtY12Uu0p7HVwQu1yHnl3qQN9T9W3Gg8zQXhLi', -- Password: admin123
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;