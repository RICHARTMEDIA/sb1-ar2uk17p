/*
  # Add Artist Page Schema

  1. New Tables
    - `artist_profile`
      - `id` (uuid, primary key)
      - `name` (text)
      - `image` (text)
      - `bio` (text)
      - `social_links` (jsonb)
      - `videos` (jsonb)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `artist_profile` table
    - Add policy for authenticated users to manage their profile
    - Add policy for public access
*/

CREATE TABLE IF NOT EXISTS artist_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image text,
  bio text,
  social_links jsonb DEFAULT '[]'::jsonb,
  videos jsonb DEFAULT '[]'::jsonb,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE artist_profile ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to manage their profile
CREATE POLICY "Users can manage their own artist profile"
  ON artist_profile
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for public access to all profiles
CREATE POLICY "Anyone can view artist profiles"
  ON artist_profile
  FOR SELECT
  TO anon
  USING (true);