/*
  # Initial Schema Setup

  1. Tables
    - releases
      - id (uuid, primary key)
      - title (text)
      - image_url (text)
      - description (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - distribution_links
      - id (uuid, primary key)
      - platform (text)
      - url (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Releases table
CREATE TABLE IF NOT EXISTS releases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE releases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to authenticated users" ON releases
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Distribution links table
CREATE TABLE IF NOT EXISTS distribution_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE distribution_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to authenticated users" ON distribution_links
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);