/*
  # Add gallery column to artist_profile table

  1. Changes
    - Add gallery column to artist_profile table with default empty array
    - Update existing rows with default value
*/

-- Add gallery column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'artist_profile' AND column_name = 'gallery'
  ) THEN
    ALTER TABLE artist_profile 
    ADD COLUMN gallery jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Update any existing rows that have null values
UPDATE artist_profile
SET gallery = COALESCE(gallery, '[]'::jsonb)
WHERE gallery IS NULL;