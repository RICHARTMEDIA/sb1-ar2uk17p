/*
  # Add artist_name column to promo_pages table
  
  1. Changes:
    - Add artist_name column with default empty string
    - Make column not null
    - Add index for better performance
*/

-- Add artist_name column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'promo_pages' AND column_name = 'artist_name'
  ) THEN
    ALTER TABLE promo_pages 
    ADD COLUMN artist_name text NOT NULL DEFAULT '';
  END IF;
END $$;

-- Create index for artist_name
CREATE INDEX IF NOT EXISTS idx_promo_pages_artist_name ON promo_pages (artist_name);