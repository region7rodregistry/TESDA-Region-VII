-- Analytics Schema for TESDA Region VII

-- Table to track page views
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  page_name TEXT,
  user_agent TEXT,
  referrer TEXT,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table to track CTA button clicks
CREATE TABLE IF NOT EXISTS cta_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  button_text TEXT NOT NULL,
  button_link TEXT NOT NULL,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table to track contact form interactions
CREATE TABLE IF NOT EXISTS contact_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interaction_type TEXT NOT NULL, -- 'form_view', 'form_submit', 'field_focus'
  field_name TEXT, -- Which field was interacted with
  user_agent TEXT,
  success BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_cta_clicks_created_at ON cta_clicks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cta_clicks_button_text ON cta_clicks(button_text);
CREATE INDEX IF NOT EXISTS idx_contact_interactions_created_at ON contact_interactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_interactions_type ON contact_interactions(interaction_type);

-- Enable Row Level Security (RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE cta_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies to allow insert from anyone (for tracking)
CREATE POLICY "Allow insert page views" ON page_views
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow insert cta clicks" ON cta_clicks
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow insert contact interactions" ON contact_interactions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Create policies to allow select only for authenticated users (admin)
CREATE POLICY "Allow select page views for authenticated" ON page_views
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow select cta clicks for authenticated" ON cta_clicks
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow select contact interactions for authenticated" ON contact_interactions
  FOR SELECT TO authenticated
  USING (true);

-- Views for analytics summary
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
  (SELECT COUNT(*) FROM page_views) as total_page_views,
  (SELECT COUNT(*) FROM cta_clicks) as total_cta_clicks,
  (SELECT COUNT(*) FROM contact_interactions WHERE interaction_type = 'form_submit') as total_contact_submissions,
  (SELECT COUNT(*) FROM page_views WHERE created_at > NOW() - INTERVAL '24 hours') as views_last_24h,
  (SELECT COUNT(*) FROM cta_clicks WHERE created_at > NOW() - INTERVAL '24 hours') as cta_clicks_last_24h;

COMMENT ON TABLE page_views IS 'Tracks page views across the application';
COMMENT ON TABLE cta_clicks IS 'Tracks CTA button clicks';
COMMENT ON TABLE contact_interactions IS 'Tracks contact form interactions and submissions';

