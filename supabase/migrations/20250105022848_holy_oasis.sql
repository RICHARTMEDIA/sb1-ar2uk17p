/*
  # Add social links to promo pages

  1. Changes
    - Add social_links column to promo_pages table
    - Set default value to empty array
    - Add not null constraint
    - Add validation check for social_links structure

  2. Data Migration
    - Set default empty array for existing rows
*/

-- Add social_links column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'promo_pages' AND column_name = 'social_links'
  ) THEN
    ALTER TABLE promo_pages 
    ADD COLUMN social_links jsonb DEFAULT '[]'::jsonb NOT NULL;

    -- Add check constraint to ensure social_links is an array
    ALTER TABLE promo_pages
    ADD CONSTRAINT social_links_is_array 
    CHECK (jsonb_typeof(social_links) = 'array');
  END IF;
END $$;

-- Update any existing rows to have empty array
UPDATE promo_pages 
SET social_links = '[]'::jsonb 
WHERE social_links IS NULL;

-- Add comment to describe the column
COMMENT ON COLUMN promo_pages.social_links IS 'Array of social media links with platform and URL';