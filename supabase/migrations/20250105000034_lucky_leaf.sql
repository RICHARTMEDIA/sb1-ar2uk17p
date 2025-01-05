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

-- Add constraint to ensure gallery is not null
ALTER TABLE artist_profile 
  ALTER COLUMN gallery SET NOT NULL,
  ALTER COLUMN gallery SET DEFAULT '[]'::jsonb;