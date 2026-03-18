-- RUN IN SUPABASE SQL EDITOR --

-- 1. Create the table if it doesn't exist (with all new columns)
CREATE TABLE IF NOT EXISTS student_works (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  student_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  content TEXT,
  image_url TEXT,
  images TEXT[] DEFAULT '{}', -- Array for gallery images
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Add columns if table already existed (SAFE MIGRATION)
-- This will not error if columns already exist
DO $$ 
BEGIN 
  BEGIN
    ALTER TABLE student_works ADD COLUMN content TEXT;
  EXCEPTION WHEN duplicate_column THEN
    RAISE NOTICE 'column content already exists, skipping';
  END;

  BEGIN
    ALTER TABLE student_works ADD COLUMN images TEXT[] DEFAULT '{}';
  EXCEPTION WHEN duplicate_column THEN
    RAISE NOTICE 'column images already exists, skipping';
  END;
END $$;

-- 3. Setup RLS Policies (Safe approach)
ALTER TABLE student_works ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access student_works" ON student_works;
CREATE POLICY "Public read access student_works" ON student_works FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert access student_works" ON student_works;
CREATE POLICY "Public insert access student_works" ON student_works FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public update access student_works" ON student_works;
CREATE POLICY "Public update access student_works" ON student_works FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Public delete access student_works" ON student_works;
CREATE POLICY "Public delete access student_works" ON student_works FOR DELETE USING (true);
