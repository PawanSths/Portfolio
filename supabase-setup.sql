-- Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- This creates the table needed for portfolio content persistence.

CREATE TABLE IF NOT EXISTS portfolio_content (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial row (will be updated on first admin save)
INSERT INTO portfolio_content (id, content, updated_at)
VALUES ('singleton', '{}'::jsonb, NOW())
ON CONFLICT (id) DO NOTHING;
