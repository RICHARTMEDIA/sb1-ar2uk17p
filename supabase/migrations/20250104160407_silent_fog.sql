-- Add index for is_published column to improve query performance
CREATE INDEX IF NOT EXISTS idx_promo_pages_is_published ON promo_pages (is_published);

-- Set default value for existing rows
UPDATE promo_pages SET is_published = false WHERE is_published IS NULL;

-- Add not null constraint
ALTER TABLE promo_pages 
  ALTER COLUMN is_published SET DEFAULT false,
  ALTER COLUMN is_published SET NOT NULL;