/*
  # Fix admin user authentication

  1. Changes
    - Update existing admin user if exists, otherwise create new
    - Ensure correct identity setup
  
  2. Security
    - Uses proper password hashing
    - Sets up complete auth records
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Update existing user if exists, otherwise insert new
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
        UPDATE auth.users
        SET encrypted_password = crypt('admin123', gen_salt('bf')),
            raw_app_meta_data = '{"provider": "email", "providers": ["email"]}'::jsonb,
            raw_user_meta_data = '{}'::jsonb,
            updated_at = now()
        WHERE email = 'admin@example.com';
    ELSE
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
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin,
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
            '{"provider": "email", "providers": ["email"]}',
            '{}',
            false,
            '',
            '',
            '',
            ''
        );
    END IF;
END $$;

-- Update or insert identity record
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
)
ON CONFLICT (provider, provider_id) 
DO UPDATE SET
    last_sign_in_at = now(),
    updated_at = now();