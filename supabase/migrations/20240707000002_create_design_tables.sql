-- Create designs table
CREATE TABLE IF NOT EXISTS designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  materials TEXT[] NOT NULL,
  file_url TEXT,
  designer_id UUID NOT NULL REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'active',
  sales_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create design_images table
CREATE TABLE IF NOT EXISTS design_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  design_id UUID NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage buckets for designs
INSERT INTO storage.buckets (id, name, public) VALUES ('designs', 'designs', true) ON CONFLICT DO NOTHING;

-- Set up storage policies
DROP POLICY IF EXISTS "Designs bucket public read access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload design files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own design files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own design files" ON storage.objects;

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

-- Set up RLS policies for designs
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for active designs"
  ON designs FOR SELECT
  USING (status = 'active');

CREATE POLICY "Designers can create their own designs"
  ON designs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Designers can update their own designs"
  ON designs FOR UPDATE
  TO authenticated
  USING (designer_id = auth.uid());

CREATE POLICY "Designers can delete their own designs"
  ON designs FOR DELETE
  TO authenticated
  USING (designer_id = auth.uid());

-- Set up RLS policies for design_images
ALTER TABLE design_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for design images"
  ON design_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Designers can create images for their designs"
  ON design_images FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM designs
    WHERE designs.id = design_images.design_id
    AND designs.designer_id = auth.uid()
  ));

CREATE POLICY "Designers can update images for their designs"
  ON design_images FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM designs
    WHERE designs.id = design_images.design_id
    AND designs.designer_id = auth.uid()
  ));

CREATE POLICY "Designers can delete images for their designs"
  ON design_images FOR DELETE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM designs
    WHERE designs.id = design_images.design_id
    AND designs.designer_id = auth.uid()
  ));

-- Enable realtime for designs and design_images
alter publication supabase_realtime add table designs;
alter publication supabase_realtime add table design_images;