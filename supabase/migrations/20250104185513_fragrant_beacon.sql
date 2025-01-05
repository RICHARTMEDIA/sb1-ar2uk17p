/*
  # Update Artist Profile Schema

  1. Changes
    - Add sections_visible column with default visibility settings
    - Add latest_release column with default empty structure
    - Add other_releases column for additional releases
    - Add products column for merchandise
    - Update existing rows with default values

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns with proper defaults if they don't exist
DO $$ 
BEGIN
  -- Add sections_visible if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'artist_profile' AND column_name = 'sections_visible'
  ) THEN
    ALTER TABLE artist_profile 
    ADD COLUMN sections_visible jsonb DEFAULT '{
      "latestRelease": true,
      "otherReleases": true,
      "videos": true,
      "socialLinks": true,
      "products": true
    }'::jsonb;
  END IF;

  -- Add latest_release if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'artist_profile' AND column_name = 'latest_release'
  ) THEN
    ALTER TABLE artist_profile 
    ADD COLUMN latest_release jsonb DEFAULT '{
      "id": "00000000-0000-0000-0000-000000000000",
      "title": "",
      "description": "",
      "image": "",
      "url": ""
    }'::jsonb;
  END IF;

  -- Add other_releases if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'artist_profile' AND column_name = 'other_releases'
  ) THEN
    ALTER TABLE artist_profile 
    ADD COLUMN other_releases jsonb DEFAULT '[]'::jsonb;
  END IF;

  -- Add products if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'artist_profile' AND column_name = 'products'
  ) THEN
    ALTER TABLE artist_profile 
    ADD COLUMN products jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Update any existing rows that have null values
UPDATE artist_profile
SET 
  sections_visible = COALESCE(sections_visible, '{
    "latestRelease": true,
    "otherReleases": true,
    "videos": true,
    "socialLinks": true,
    "products": true
  }'::jsonb),
  latest_release = COALESCE(latest_release, '{
    "id": "00000000-0000-0000-0000-000000000000",
    "title": "",
    "description": "",
    "image": "",
    "url": ""
  }'::jsonb),
  other_releases = COALESCE(other_releases, '[]'::jsonb),
  products = COALESCE(products, '[]'::jsonb)
WHERE 
  sections_visible IS NULL OR
  latest_release IS NULL OR
  other_releases IS NULL OR
  products IS NULL;