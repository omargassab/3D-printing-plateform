-- Ensure storage bucket exists and is public
INSERT INTO storage.buckets (id, name, public) 
VALUES ('designs', 'designs', true) 
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Designs bucket public read access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload design files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own design files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own design files" ON storage.objects;

-- Create storage policies with proper permissions
CREATE POLICY "Designs bucket public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'designs');

CREATE POLICY "Authenticated users can upload design files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'designs');

CREATE POLICY "Users can update their own design files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'designs');

CREATE POLICY "Users can delete their own design files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'designs');