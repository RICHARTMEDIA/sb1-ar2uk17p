/*
  # Create promo pages table

  1. New Tables
    - `promo_pages`
      - `id` (uuid, primary key)
      - `title` (text)
      - `banner_image` (text)
      - `latest_release_title` (text)
      - `latest_release_description` (text)
      - `latest_release_image` (text)
      - `platform_links` (jsonb)
      - `other_releases` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `user_id` (uuid, foreign key)
  2. Security
    - Enable RLS on `promo_pages` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS promo_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  banner_image text,
  latest_release_title text,
  latest_release_description text,
  latest_release_image text,
  platform_links jsonb DEFAULT '[]'::jsonb,
  other_releases jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE promo_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own promo pages"
  ON promo_pages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);