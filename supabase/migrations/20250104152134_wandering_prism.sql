/*
  # Add metadata fields to promo pages

  1. Changes
    - Add metadata fields to promo_pages table:
      - meta_title (text): SEO title
      - meta_description (text): SEO description
      - meta_keywords (text): SEO keywords
      - meta_image (text): Social sharing image URL
    - Add default values for existing rows
    - Add validation checks

  2. Security
    - Maintains existing RLS policies
*/

-- Add new metadata columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promo_pages' AND column_name = 'meta_title') THEN
    ALTER TABLE promo_pages ADD COLUMN meta_title text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promo_pages' AND column_name = 'meta_description') THEN
    ALTER TABLE promo_pages ADD COLUMN meta_description text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promo_pages' AND column_name = 'meta_keywords') THEN
    ALTER TABLE promo_pages ADD COLUMN meta_keywords text;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promo_pages' AND column_name = 'meta_image') THEN
    ALTER TABLE promo_pages ADD COLUMN meta_image text;
  END IF;
END $$;

-- Set default values for existing rows
UPDATE promo_pages
SET 
  meta_title = COALESCE(meta_title, title),
  meta_description = COALESCE(meta_description, latest_release_description),
  meta_keywords = COALESCE(meta_keywords, ''),
  meta_image = COALESCE(meta_image, latest_release_image)
WHERE meta_title IS NULL 
   OR meta_description IS NULL 
   OR meta_keywords IS NULL 
   OR meta_image IS NULL;

-- Add check constraints for metadata fields
ALTER TABLE promo_pages
  ADD CONSTRAINT meta_title_length CHECK (char_length(meta_title) <= 60),
  ADD CONSTRAINT meta_description_length CHECK (char_length(meta_description) <= 160);