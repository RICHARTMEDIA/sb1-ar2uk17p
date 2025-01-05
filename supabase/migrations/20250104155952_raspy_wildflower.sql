/*
  # Add publish status to promo pages

  1. Changes
    - Add `is_published` column to `promo_pages` table
    - Update RLS policies to allow public access to published pages
*/

-- Add is_published column
ALTER TABLE promo_pages ADD COLUMN IF NOT EXISTS is_published boolean DEFAULT false;

-- Update RLS policies
DROP POLICY IF EXISTS "Users can manage their own promo pages" ON promo_pages;
DROP POLICY IF EXISTS "Anyone can view published pages" ON promo_pages;

-- Policy for authenticated users to manage their pages
CREATE POLICY "Users can manage their own promo pages"
  ON promo_pages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy for public access to published pages
CREATE POLICY "Anyone can view published pages"
  ON promo_pages
  FOR SELECT
  TO anon
  USING (is_published = true);