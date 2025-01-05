/*
  # Create admin user and identity

  1. Changes
    - Create admin user with specific UID
    - Add identity record with required provider_id
  
  2. Security
    - Uses secure password hashing
    - Sets up proper authentication records
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create admin user if not exists
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
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '',
  '',
  '',
  ''
) ON CONFLICT (id) DO NOTHING;

-- Create identity record with required provider_id
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  'de0d1a3b-a9d1-4eab-8be4-da0eb7603e26',
  'de0d1a3b-a9d1-4eab-8be4-da0eb7603e26',
  jsonb_build_object(
    'sub', 'de0d1a3b-a9d1-4eab-8be4-da0eb7603e26',
    'email', 'admin@example.com'
  ),
  'email',
  'admin@example.com',
  now(),
  now(),
  now()
) ON CONFLICT (provider, provider_id) DO NOTHING;