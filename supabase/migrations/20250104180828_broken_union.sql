/*
  # Update Artist Profile Schema

  1. Changes
    - Add IF NOT EXISTS checks for policies
    - Ensure idempotent execution
    - Preserve existing data
*/

-- Create artist_profile table if it doesn't exist
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

-- Enable Row Level Security
ALTER TABLE artist_profile ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can manage their own artist profile" ON artist_profile;
    DROP POLICY IF EXISTS "Anyone can view artist profiles" ON artist_profile;
EXCEPTION
    WHEN undefined_object THEN 
        NULL;
END $$;

-- Create policies
CREATE POLICY "Users can manage their own artist profile"
  ON artist_profile
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view artist profiles"
  ON artist_profile
  FOR SELECT
  TO anon
  USING (true);

-- Create index if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_artist_profile_user_id ON artist_profile(user_id);