CREATE TABLE public.compendium_uploads (
    sheetName text PRIMARY KEY,
    data jsonb,
    timestamp timestamptz DEFAULT now()
);

-- Hero content table
CREATE TABLE public.hero_content (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    h1_text text NOT NULL,
    h3_text text NOT NULL,
    cta_button_text text NOT NULL,
    cta_button_link text NOT NULL,
    hero_image_url text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Optional: Add RLS policies if you need to control access to this table
-- For example, to allow all authenticated users to insert/update:
-- ALTER TABLE public.compendium_uploads ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow authenticated users to manage compendium uploads" ON public.compendium_uploads
--   FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

-- Enable RLS for hero_content table
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage hero content
CREATE POLICY "Allow authenticated users to manage hero content" ON public.hero_content
  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

-- Allow public read access for hero content (so the hero section can display it)
CREATE POLICY "Allow public read access to hero content" ON public.hero_content
  FOR SELECT USING (TRUE);

-- Storage policies for hero-images bucket
-- Allow public read access to hero images
CREATE POLICY "Public read access to hero images" ON storage.objects
  FOR SELECT USING (bucket_id = 'hero-images');

-- Allow authenticated users to upload hero images
CREATE POLICY "Authenticated users can upload hero images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'hero-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update hero images
CREATE POLICY "Authenticated users can update hero images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'hero-images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete hero images
CREATE POLICY "Authenticated users can delete hero images" ON storage.objects
  FOR DELETE USING (bucket_id = 'hero-images' AND auth.role() = 'authenticated');
