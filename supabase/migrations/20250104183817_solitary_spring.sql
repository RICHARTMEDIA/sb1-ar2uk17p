/*
  # Artist Profile Schema Update
  
  1. Table Changes
    - Create artist_profile table with default values
    - Add sections visibility control
    - Add latest release and other releases storage
    - Add products support
  
  2. Security
    - Enable RLS
    - Update policies for authenticated users and public access
    
  3. Performance
    - Add index on user_id for faster lookups
*/

-- Create artist_profile table
CREATE TABLE IF NOT EXISTS artist_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  image text DEFAULT '',
  bio text DEFAULT '',
  social_links jsonb DEFAULT '[]'::jsonb,
  videos jsonb DEFAULT '[]'::jsonb,
  sections_visible jsonb DEFAULT '{
    "latestRelease": true,
    "otherReleases": true,
    "videos": true,
    "socialLinks": true,
    "products": true
  }'::jsonb,
  latest_release jsonb DEFAULT '{
    "id": "00000000-0000-0000-0000-000000000000",
    "title": "",
    "description": "",
    "image": "",
    "url": ""
  }'::jsonb,
  other_releases jsonb DEFAULT '[]'::jsonb,
  products jsonb DEFAULT '[]'::jsonb,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
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

-- Create index
CREATE INDEX IF NOT EXISTS idx_artist_profile_user_id ON artist_profile(user_id);